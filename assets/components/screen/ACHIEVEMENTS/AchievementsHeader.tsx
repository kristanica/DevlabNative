import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
type AchievementsHeaderPayload = {
  userData: any;
  userAchievements: any;
};
const AchievementsHeader = ({ userData }: AchievementsHeaderPayload) => {
  return (
    <ImageBackground
      source={
        userData?.backgroundImage
          ? { uri: userData?.backgroundImage }
          : require("@/assets/images/default-background.jpg")
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
        <Text className="text-white font-exoBold">HALL OF ACHIEVEMENTS</Text>
      </View>
    </ImageBackground>
  );
};

export default AchievementsHeader;

const styles = StyleSheet.create({});
