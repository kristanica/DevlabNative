import React from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";

const StageContainer = ({
  stageInformation,
}: // index,
StagesContainerPayload) => {
  // const isFocused = useIsFocused();
  // const { onScale } = useSequentialAppearAnim({
  //   indicator: isFocused,
  //   id: index,
  // });
  return (
    <Animated.View
      // style={onScale}
      className="bg-[#111827] my-2 rounded-2xl border-[2px] border-black h-40 p-3 mx-3"
    >
      <View>
        <Text className="text-white font-exoBold text-xl xs:text-[12px]">
          {stageInformation.title}
        </Text>
      </View>

      <View className="mt-2">
        <Text
          className="text-[#94A1B2]   text-justify font-exoLight  text-xs xs:text-[9px] "
          numberOfLines={2}
        >
          {stageInformation.description}
        </Text>
      </View>

      <View className="my-2">
        <Text className="text-white font-exoBold   text-[9px] xs:text-[8px]">
          {stageInformation.isHidden ? "Game" : "Lesson"}
        </Text>
      </View>
    </Animated.View>
  );
};

export default StageContainer;
