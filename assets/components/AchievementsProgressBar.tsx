import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

const AchievementsProgressBar = () => {
  return (
    <View className="flex-[1] flex-col justify-center items-center mx-2 rounded-sm">
      <CircularProgress
        value={20}
        radius={20}
        progressValueColor={"#ecf0f1"}
        maxValue={200}
      />

      <View className="justify-center items-center">
        <Text className="text-sm">HTML</Text>
        <Text className="text-sm">Achievements</Text>
      </View>
    </View>
  );
};

export default AchievementsProgressBar;

const styles = StyleSheet.create({});
