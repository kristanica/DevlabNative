import useSequentialAppearAnim from "@/assets/Hooks/useSequentialAppearAnim";
import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";

const AdminLessonContainer = ({
  itemContents,
  index,
}: AdminLessonContainerPayload) => {
  const isFocused = useIsFocused();
  const { onScale } = useSequentialAppearAnim({
    indicator: isFocused,
    id: index,
  });

  return (
    <Animated.View
      style={onScale}
      className="bg-[#111827] my-2 rounded-2xl border-2 border-black h-40 p-3 mx-3 relative"
    >
      <View>
        <Text className="text-white font-exoBold text-xl xs:text-[12px] ">
          {itemContents.title}
        </Text>
      </View>

      <View className="mt-2">
        <Text className="text-[#94A1B2]  text-justify font-exoLight text-xs xs:text-[9px]">
          {itemContents.description}
        </Text>
      </View>
    </Animated.View>
  );
};

export default AdminLessonContainer;
