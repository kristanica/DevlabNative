import React, { memo } from "react";
import { Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

type AchievementProgressBarProps = {
  name: string;
  progress: number; // e.g. 0–10 (number of achievements completed)
};

const AchievementsProgressBar = ({
  name,
  progress,
}: AchievementProgressBarProps) => {
  const maxAchievements = 10;
  const progressPercent = (progress / maxAchievements) * 100;

  return (
    <View
      className="flex-col justify-between items-center mx-2 my-2"
      style={{ width: 80, height: 100 }}
    >
      {/* Background Frame */}
      <View className="bg-[#1f1f2e] rounded-xl border-[#4b4b6b] border-[2px] justify-center items-center p-2 ">
        {/* Circular Progress */}
        <CircularProgress
          value={progressPercent}
          radius={30}
          maxValue={100}
          duration={1200}
          valueSuffix="%"
          activeStrokeColor="#2CB67D"
          inActiveStrokeColor="#2A2A35"
          progressValueColor="#FFFFFF"
          progressValueStyle={{ fontSize: 12, fontFamily: "Exo-Bold" }}
          strokeLinecap="round"
        />
        <Text className="text-xs xs:text-[9px] text-white font-exoSemi text-center">
          {name === "Db"
            ? "Database".toLocaleUpperCase()
            : name === "Js"
            ? "JavaScript".toLocaleUpperCase()
            : name.toLocaleUpperCase()}
        </Text>
      </View>
      {/* Labels */}
    </View>
  );
};

export default memo(AchievementsProgressBar);
