import { WhereIsUser } from "@/assets/zustand/WhereIsUser";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type NavigatingStageProps = {
  currentStageData: any;
};

const StageCodeCrafter = ({ currentStageData }: NavigatingStageProps) => {
  const location = WhereIsUser((state) => state.location);
  console.log(location);
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
          <Text className="text-white font-exoRegular xs:text-xs text-justify">
            {currentStageData?.copyCode}
          </Text>
        </View>
      </View>
    </>
  );
};

export default StageCodeCrafter;

const styles = StyleSheet.create({});
