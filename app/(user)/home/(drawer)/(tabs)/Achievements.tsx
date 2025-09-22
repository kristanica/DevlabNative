import AchievementContainer from "@/assets/components/AchievementsComponents/AchievementContainer";
import AchievementsProgressBar from "@/assets/components/AchievementsComponents/AchievementsProgressBar";
import React, { useState } from "react";

import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import { htmlMockUp, mockData } from "@/assets/constants/constants";

import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Text,
  View,
} from "react-native";

const Achievements = () => {
  const [category, setCategory] =
    useState<
      { name: string; description: string; id: number; complete: boolean }[]
    >(htmlMockUp);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    mockData[0].name || "HTML"
  );

  const { userData } = useGetUserInfo();

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
              <View className="flex-[1] justify-center items-center mt-3 ">
                <Image
                  source={
                    userData?.profileImage
                      ? { uri: userData?.profileImage }
                      : require("@/assets/images/profile.png")
                  }
                  className="w-[100px] h-[100px] overflow-hidden rounded-full"
                />
              </View>
              {/* Renders name */}
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
                  data={mockData}
                  columnWrapperStyle={{
                    justifyContent: "space-between",
                  }}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        setCategory(item.data);
                        setSelectedCategory(item.name);
                      }}
                    >
                      <Text className="text-white font-exoBold xs:text-lg">
                        {item.name}
                      </Text>
                    </Pressable>
                  )}
                />
              </View>

              <View className="flex-[1] ">
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
                  data={category}
                  renderItem={({ item }) => (
                    <AchievementContainer
                      name={item.name}
                      description={item.description}
                      id={item.id}
                      complete={item.complete}
                      selectedCategory={selectedCategory}
                    />
                  )}
                />
              </View>
            </View>
          </CustomGeneralContainer>
        </AnimatedViewContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default Achievements;
