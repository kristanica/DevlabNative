import brainBytes from "@/assets/Hooks/mainGameModeFunctions/brainBytes";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
type StageLessonprops = {
  currentStageData: any;
};
const StageBrainBytes = ({ currentStageData }: any) => {
  const { compareUserAnswer, arrayChoices } = brainBytes(
    currentStageData?.choices
  );
  return (
    <>
      <Text className="font-exoBold xs:text-xl text-justify text-red-500">
        {currentStageData?.title}
      </Text>
      <Text className="text-white font-exoRegular xs:text-xs my-3 text-justify">
        {currentStageData?.description}
      </Text>
      <View className="bg-accentContainer p-3 rounded-3xl my-3">
        <Text className="font-exoBold text-xl text-white">Instructions</Text>
        <Text className="text-white font-exoRegular xs:text-xs text-justify my-3">
          {currentStageData?.instruction}
        </Text>
        <View className="bg-background p-3 rounded-3xl my-3">
          {arrayChoices.map((choice: string, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => compareUserAnswer(choice)}
            >
              <Text className="py-2 text-white font-exoRegular xs:text-lg text-justify ">
                {choice}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};

export default StageBrainBytes;

const styles = StyleSheet.create({});
