import { fontFamily } from "@/fontFamily/fontFamily";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

type AchievementContainerProps = {
  name: string;
  id?: number;
};

// Achievement progress bar for (Tabs)/Achievement.tsx
const AchievementsProgressBar = ({ name, id }: AchievementContainerProps) => {
  return (
    <View
      key={id}
      className="flex-[1] flex-col justify-center items-center mx-2 my-2"
    >
      {/* Background opacity */}
      <View className="absolute bg-slate-200 h-full w-full opacity-15 rounded-xl border-black border-[2px]"></View>
      <CircularProgress
        value={20}
        radius={20}
        progressValueColor={"#ecf0f1"}
        maxValue={200}
      />
      {/* Render's Name */}
      <View className="justify-center items-center">
        <Text
          className="text-sm text-white"
          style={{ fontFamily: fontFamily.ExoRegular }}
        >
          {name}
        </Text>
        <Text
          className="text-sm text-white"
          style={{ fontFamily: fontFamily.ExoRegular }}
        >
          Achievements
        </Text>
      </View>
    </View>
  );
};

export default memo(AchievementsProgressBar);

const styles = StyleSheet.create({});
