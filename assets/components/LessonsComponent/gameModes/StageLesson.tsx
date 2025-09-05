import { WhereIsUser } from "@/assets/zustand/WhereIsUser";
import Ionicons from "@expo/vector-icons/Ionicons";
// import * as Clipboard from "expo-clipboard";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
type StageLessonprops = {
  currentStageData: any;
};
const StageLesson = ({ currentStageData }: StageLessonprops) => {
  const location = WhereIsUser((state) => state.location);
  console.log(location);
  return (
    <>
      <Text className="text-white font-exoBold xs:text-xl text-justify">
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
        <View className="bg-background p-3 rounded-3xl my-3 flex-row justify-between">
          <Text className="text-white font-exoRegular xs:text-xs text-justify">
            {currentStageData?.codingInterface}
          </Text>
          <TouchableOpacity>
            <Ionicons
              name="clipboard-outline"
              size={20}
              color={"white"}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default StageLesson;

const styles = StyleSheet.create({});
