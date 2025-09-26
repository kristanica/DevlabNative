import AchievementContainer from "@/assets/components/AchievementsComponents/AchievementContainer";
import AchievementsProgressBar from "@/assets/components/AchievementsComponents/AchievementsProgressBar";
import React, { useState } from "react";

import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import { auth, db, mockData } from "@/assets/constants/constants";

import { fetchAchievements } from "@/assets/API/fireBase/user/fetchAchievements";
import LoadingAnim from "@/assets/components/LoadingAnim";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  FlatList,
  Image,
  ImageBackground,
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
                  {userData?.username}
                </Text>

                <Text className="text-white font-exoBold">
                  Hall of Achievements
                </Text>
              </View>

              {/* Renders AchivementsProgressBar component */}
              <View className="flex-[1]  flex-row justify-center items-center">
                {mockData.map((item) => (
                  <AchievementsProgressBar key={item.id} name={item.name} />
                ))}
              </View>
            </ImageBackground>

            <View className="bg-accent flex-[2] ">
              {/* Renders navugation buttons to switch achivements tab (CSS, JS, DB, HTML) */}
              <View className=" items-center flex-row border-b-2  py-2  border-accentContainer px-3">
                <FlatList
                  alwaysBounceVertical={false}
                  showsHorizontalScrollIndicator={false}
                  numColumns={4}
                  data={category}
                  columnWrapperStyle={{
                    justifyContent: "space-between",
                  }}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        setSelectedCategory(item);
                      }}
                    >
                      <Text className="text-white font-exoBold xs:text-lg">
                        {item}
                      </Text>
                    </Pressable>
                  )}
                />
              </View>

              <View className="flex-[1] ">
                {isLoading ? (
                  <LoadingAnim></LoadingAnim>
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
