import { achievementPlaceHolder } from "@/assets/constants/constants";
import React, { useCallback } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AchievementsProgressBar from "../../AchievementsComponents/AchievementsProgressBar";
type AchievementsHeaderPayload = {
  userData: any;
  userAchievements: any;
};
const AchievementsHeader = ({
  userData,
  userAchievements,
}: AchievementsHeaderPayload) => {
  const id = useCallback((item: any) => String(item.id), []);
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<any>) => {
      if (item.subject === "JavaScript") {
        item.subject = "Js";
      }
      if (item.subject === "Database") {
        item.subject = "Db";
      }

      const totalAchievementsCompleted = userAchievements.filter(
        (achievement: any) => achievement.id.startsWith(item.subject)
      ).length;
      console.log(totalAchievementsCompleted);
      return (
        <AchievementsProgressBar
          progress={totalAchievementsCompleted}
          name={item.subject}
        />
      );
    },
    [userData, userAchievements]
  );
  return (
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
        <Text className="text-white font-exoBold">Hall of Achievements</Text>
      </View>

      <View className="flex-[1]  flex-row justify-between items-center">
        <FlatList
          data={achievementPlaceHolder ?? []}
          horizontal={true}
          keyExtractor={id}
          renderItem={renderItem}
        ></FlatList>
      </View>
    </ImageBackground>
  );
};

export default AchievementsHeader;

const styles = StyleSheet.create({});
