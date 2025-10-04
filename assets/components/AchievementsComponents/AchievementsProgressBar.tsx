import React, { memo } from "react";
import { Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

type AchievementContainerProps = {
  name: string;
  id?: number;
  progress: number;
};

// Achievement progress bar for (Tabs)/Achievement.tsx
const AchievementsProgressBar = ({
  name,
  id,
  progress,
}: AchievementContainerProps) => {
  return (
    <View
      className="flex-col justify-center items-center mx-2 my-2"
      style={{ width: 80, height: 80 }}
    >
      <View
        className="absolute bg-slate-200 opacity-20 rounded-xl border-black border-[2px]"
        style={{ width: 80, height: 80 }}
      />

      <CircularProgress
        value={progress}
        radius={20}
        progressValueColor="#ecf0f1"
        maxValue={10}
      />

      {/* Name */}
      <View className="justify-center items-center mt-2">
        <Text className="text-xs xs:text-[9px] text-white font-exoRegular">
          {name}
        </Text>
        <Text className="text-xs xs:text-[9px] text-white font-exoRegular">
          Achievements
        </Text>
      </View>
    </View>
  );
};

export default memo(AchievementsProgressBar);
