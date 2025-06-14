import AchievementContainer from "@/assets/components/AchievementContainer";
import AchievementsProgressBar from "@/assets/components/AchievementsProgressBar";
import { fontFamily } from "@/fontFamily/fontFamily";
import React, { useState } from "react";

import { useBackground } from "@/assets/Provider/BackgroundProvider";
import { useProfile } from "@/assets/Provider/ProfileProvider";
import {
  cssMockUp,
  databaseMockUp,
  htmlMockUp,
  jsMockUp,
} from "@/assets/mockup";
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Achievements = () => {
  const mockData = [
    {
      id: 1,
      name: "HTML",
      data: htmlMockUp,
    },
    {
      id: 2,
      name: "CSS",
      data: cssMockUp,
    },
    {
      id: 3,
      name: "JavaScript",
      data: jsMockUp,
    },
    {
      id: 4,
      name: "Database",
      data: databaseMockUp,
    },
  ];

  const [category, setCatergory] =
    useState<
      { name: string; description: string; id: number; complete: boolean }[]
    >(htmlMockUp);

  // Recieves background and profile images
  const { backgroundVal } = useBackground();
  const { profileVal } = useProfile();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ImageBackground
        // backgroundVal context usage
        source={
          backgroundVal
            ? { uri: backgroundVal }
            : // Default val if backgroundVal is false
              require("@/assets/images/pink-background-sample.jpg")
        }
        className="bg-accent flex-[1] m-3 rounded-[10px] overflow-hidden"
        style={{ borderRadius: 20 }}
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
          <Text
            className="text-white"
            style={{ fontFamily: fontFamily.ExoBold }}
          >
            LAIN
          </Text>

          <Text
            className="text-white"
            style={{ fontFamily: fontFamily.ExoBold }}
          >
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

      <View className="bg-accent flex-[2] m-3 mt-0 rounded-[10px]">
        {/* Renders navugation buttons to switch achivements tab (CSS, JS, DB, HTML) */}
        <View className="flex-[.1] mb-0 flex-row justify-evenly items-center border-b-2 border-accentContainer">
          {mockData.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setCatergory(item.data)}
            >
              <Text
                className="text-white"
                style={{ fontFamily: fontFamily.ExoBold }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
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
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Achievements;
