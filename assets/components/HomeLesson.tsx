import React from "react";

import { useIsFocused } from "@react-navigation/native";
import { Image, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import useSequentialAppearAnim from "../Hooks/useSequentialAppearAnim";

const HomeLesson = ({
  name,
  color,
  children,
  index,
  icon,
}: HomeLessonPayload) => {
  const isFocused = useIsFocused();
  const { onScale } = useSequentialAppearAnim({
    indicator: isFocused,
    id: index,
  });
  return (
    <Animated.View
      style={[{}, onScale]}
      className="w-2/5 h-48  bg-accentContainer mx-3 my-2 rounded-2xl overflow-hidden "
    >
      <View
        style={{ backgroundColor: color }}
        className="h-[70%] justify-center items-center rounded-br-none rounded-bl-none"
      >
        <Image source={icon} className="w-[50px] h-[50px]"></Image>
      </View>
      {/* Render's Name */}
      <View className=" items-center my-2 flex-row justify-between  mr-3 ml-2">
        <Text className="text-white font-exoBold  xs:text-xs">{name}</Text>
        {children}
      </View>
      <View></View>
    </Animated.View>
  );
};

export default React.memo(HomeLesson);
