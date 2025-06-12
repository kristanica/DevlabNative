import { fontFamily } from "@/fontFamily/fontFamily";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

type AchievementContainerProps = {
  name: string;
  id?: number;
};

const AchievementsProgressBar = ({ name, id }: AchievementContainerProps) => {
  return (
    <View
      key={id}
      className="flex-[1] bg-shopAccent flex-col justify-center items-center mx-2 rounded-xl"
    >
      <CircularProgress
        value={20}
        radius={20}
        progressValueColor={"#ecf0f1"}
        maxValue={200}
      />

      <View className="justify-center items-center">
        <Text
          className="text-sm text-white"
          style={{ fontFamily: fontFamily.ExoLight }}
        >
          {name}
        </Text>
        <Text
          className="text-sm text-white"
          style={{ fontFamily: fontFamily.ExoLight }}
        >
          Achievements
        </Text>
      </View>
    </View>
  );
};

export default memo(AchievementsProgressBar);

const styles = StyleSheet.create({});
