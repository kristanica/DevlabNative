import AchievementContainer from "@/assets/components/AchievementsComponents/AchievementContainer";
import AchievementsProgressBar from "@/assets/components/AchievementsComponents/AchievementsProgressBar";
import React, { useState } from "react";

import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import { auth, db } from "@/assets/constants/constants";

import { fetchAchievements } from "@/assets/API/fireBase/user/fetchAchievements";
import SmallLoading from "@/assets/components/global/SmallLoading";
import { playSound } from "@/assets/Hooks/function/soundHandler";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  FlatList,
  Image,
  ImageBackground,
  ListRenderItemInfo,
  Pressable,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const Achievements = () => {
  const category = ["Html", "Css", "JavaScript", "Database"];
  const [selectedCategory, setSelectedCategory] = useState<string>("Html");

  const { userData } = useGetUserInfo();

  const { data: achievementsData, isLoading } = useQuery({
    queryKey: ["Achievement", selectedCategory],
    queryFn: () => fetchAchievements(selectedCategory),
  });

  const userAchievements = useGetUserInfo((state) => state.userAchievements);

  const claimMutation = useMutation({
    mutationFn: async ({
      achievementId,
      expReward,
      coinsReward,
    }: {
      achievementId: string;
      expReward: number;
      coinsReward: number;
    }) => {
      const uid = auth.currentUser?.uid;
      await playSound("achievementUnlocked");
      Toast.show({
        type: "claimAchievement",
        visibilityTime: 2000,
        position: "top",
        topOffset: 50,
        text1: String(coinsReward),
        text2: String(expReward),
      });
      try {
        const achievementRef = doc(
          db,
          "Users",
          String(uid),
          "Achievements",
          achievementId
        );
        const userRef = doc(db, "Users", String(uid));
        const userSnap = (await getDoc(userRef)).data();

        await setDoc(
          userRef,
          {
            exp: userSnap?.exp + expReward,
            coins: userSnap?.coins + coinsReward,
          },
          {
            merge: true,
          }
        );

        await setDoc(
          achievementRef,
          {
            isClaimed: true,
          },
          {
            merge: true,
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
  });

  const achievementPlaceHolder = [
    {
      id: 1,
      subject: "Html",
    },
    {
      id: 2,
      subject: "Css",
    },

    {
      id: 3,
      subject: "JavaScript",
    },

    {
      id: 4,
      subject: "Database",
    },
  ];
  return (
    <ProtectedRoutes>
      <View className="flex-1 bg-accent">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <ImageBackground
              source={
                userData?.backgroundImage
                  ? { uri: userData?.backgroundImage }
                  : require("@/assets/images/pink-background-sample.jpg")
              }
              className="flex-[1]"
            >
              <View className="flex-[1] justify-center items-center mt-3  -z-1">
                <Image
                  source={
                    userData?.profileImage
                      ? { uri: userData?.profileImage }
                      : require("@/assets/images/profile.png")
                  }
                  className="w-[100px] h-[100px] -z-2 overflow-hidden rounded-full"
                />
              </View>

              <View className="justify-center items-center flex-[.5] ">
                <Text className="text-white font-exoBold">
                  Hall of Achievements
                </Text>
              </View>

              <View className="flex-[1]  flex-row justify-between items-center">
                <FlatList
                  data={achievementPlaceHolder ?? []}
                  horizontal={true}
                  keyExtractor={(item) => String(item.id)}
                  renderItem={({ item }: ListRenderItemInfo<any>) => {
                    const totalAchievementsCompleted = userAchievements.filter(
                      (achievement: any) =>
                        achievement.id.startsWith(item.subject)
                    ).length;

                    return (
                      <AchievementsProgressBar
                        progress={totalAchievementsCompleted}
                        name={item.subject}
                      />
                    );
                  }}
                ></FlatList>
              </View>
            </ImageBackground>

            <View className="bg-accent flex-[2] ">
              <View className=" items-center flex-row border-b-2  py-2  border-accentContainer px-3">
                <FlatList
                  alwaysBounceVertical={false}
                  showsHorizontalScrollIndicator={false}
                  numColumns={4}
                  data={category}
                  columnWrapperStyle={{
                    justifyContent: "space-between",
                  }}
                  renderItem={({ item }) => {
                    const isSelected = item === selectedCategory;
                    return (
                      <Pressable
                        onPress={() => {
                          setSelectedCategory(item);
                        }}
                      >
                        <Text
                          className={`font-exoBold text-xs xs:text-[12px] ${
                            isSelected ? "text-white" : "text-gray-400"
                          }`}
                        >
                          {item}
                        </Text>
                      </Pressable>
                    );
                  }}
                />
              </View>

              <View className="flex-[1] ">
                {isLoading ? (
                  <SmallLoading></SmallLoading>
                ) : (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}
                    numColumns={2}
                    columnWrapperStyle={{
                      justifyContent: "space-between",
                    }}
                    keyExtractor={(item) => item.id}
                    data={achievementsData}
                    renderItem={({ item, index }) => {
                      const unlockedAchievement = userAchievements.find(
                        (achievement: any) => achievement.id === item.id
                      );

                      const isUnlocked = !!unlockedAchievement;
                      const isClaimed = unlockedAchievement?.isClaimed ?? false;

                      return (
                        <AchievementContainer
                          isUnlocked={isUnlocked}
                          index={index}
                          data={item}
                          claimMutation={() =>
                            claimMutation.mutate({
                              achievementId: item.id,
                              expReward: item.expReward,
                              coinsReward: item.coinsReward,
                            })
                          }
                          isClaimed={isClaimed}
                          selectedCategory={selectedCategory}
                        />
                      );
                    }}
                  />
                )}
              </View>
            </View>
          </CustomGeneralContainer>
        </AnimatedViewContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default Achievements;
