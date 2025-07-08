import AchievementContainer from "@/assets/components/AchievementsComponents/AchievementContainer";
import AchievementsProgressBar from "@/assets/components/AchievementsComponents/AchievementsProgressBar";
import React, { useState } from "react";

import { useBackground } from "@/assets/Provider/BackgroundProvider";
import { useProfile } from "@/assets/Provider/ProfileProvider";
import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import ButtonComponent from "@/assets/components/ButtonComponent";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import { htmlMockUp, mockData } from "@/assets/constants/constants";

import { FlatList, Image, ImageBackground, Text, View } from "react-native";

const Achievements = () => {
  const [category, setCategory] =
    useState<
      { name: string; description: string; id: number; complete: boolean }[]
    >(htmlMockUp);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    mockData[0].name || "HTML"
  );

  // Recieves background and profile images
  const { backgroundVal } = useBackground();
  const { profileVal } = useProfile();

  return (
    <ProtectedRoutes>
      <View className="flex-1 bg-accent">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <ImageBackground
              // backgroundVal context usage
              source={
                backgroundVal
                  ? { uri: backgroundVal }
                  : // Default val if backgroundVal is false
                    require("@/assets/images/pink-background-sample.jpg")
              }
              className="flex-[1]"
            >
              <View className="flex-[1] justify-center items-center mt-3 ">
                {profileVal && (
                  <Image
                    // profileVal context usage
                    source={
                      profileVal
                        ? { uri: profileVal }
                        : // Default val if profileVal is false
                          require("@/assets/images/profile.png")
                    }
                    className="w-[100px] h-[100px] overflow-hidden rounded-[10px]"
                  />
                )}
              </View>
              {/* Renders name */}
              <View className="justify-center items-center flex-[.5] ">
                <Text className="text-white font-exoBold">LAIN</Text>

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

            <View className="bg-accent flex-[2] rounded-[10px]">
              {/* Renders navugation buttons to switch achivements tab (CSS, JS, DB, HTML) */}
              <View className="flex-[.1] items-center flex-row border-b-2  border-accentContainer">
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  numColumns={4}
                  data={mockData}
                  columnWrapperStyle={{
                    justifyContent: "space-between",
                  }}
                  renderItem={({ item }) => (
                    <ButtonComponent
                      onPressAction={() => {
                        setCategory(item.data);
                        setSelectedCategory(item.name);
                      }}
                    >
                      <Text className="text-white font-exoBold">
                        {item.name}
                      </Text>
                    </ButtonComponent>
                  )}
                />
              </View>

              {/* Renders AchievementsContainer component */}
              <View className="flex-[1] m-3 mt-0">
                <FlatList
                  showsVerticalScrollIndicator={false}
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
