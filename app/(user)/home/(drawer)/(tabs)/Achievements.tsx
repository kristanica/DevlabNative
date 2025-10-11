import AchievementContainer from "@/assets/components/AchievementsComponents/AchievementContainer";
import AchievementsProgressBar from "@/assets/components/AchievementsComponents/AchievementsProgressBar";
import React, { useState } from "react";

import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import { achievementPlaceHolder } from "@/assets/constants/constants";

import { fetchAchievements } from "@/assets/API/fireBase/user/achievement/fetchAchievements";
import FillScreenLoading from "@/assets/components/global/FillScreenLoading";
import SmallLoading from "@/assets/components/global/SmallLoading";
import claimAchievementMutation from "@/assets/Hooks/query/mutation/claimAchievementMutation";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { useIsMutating, useQuery } from "@tanstack/react-query";
import {
  FlatList,
  Image,
  ImageBackground,
  ListRenderItemInfo,
  Pressable,
  Text,
  View,
} from "react-native";

const Achievements = () => {
  const category = ["Html", "Css", "JavaScript", "Database"];
  const [selectedCategory, setSelectedCategory] = useState<string>("Html");
  const { userData } = useGetUserInfo();
  const { data: achievementsData, isLoading } = useQuery({
    queryKey: ["Achievement1", selectedCategory],
    queryFn: () => fetchAchievements(selectedCategory),
    staleTime: 5 * 60 * 1000,
  });
  const userAchievements = useGetUserInfo((state) => state.userAchievements);
  const claimAchievement = claimAchievementMutation();
  const isMutating = useIsMutating();
  return (
    <ProtectedRoutes>
      <View className="flex-1 bg-accent">
        {isMutating > 0 && (
          <FillScreenLoading text="Claiming..."></FillScreenLoading>
        )}
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
                    if (item.subject === "JavaScript") {
                      item.subject = "Js";
                    }

                    const totalAchievementsCompleted = userAchievements.filter(
                      (achievement: any) =>
                        achievement.id.startsWith(item.subject)
                    ).length;
                    console.log(totalAchievementsCompleted);
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
                            claimAchievement.mutate({
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
