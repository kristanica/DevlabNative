import React from "react";

import { Image, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const HomeLesson = ({
  name,
  color,
  children,
  index,
  icon,
}: HomeLessonPayload) => {
  return (
    <Animated.View className=" bg-accentContainer mx-3 my-2 rounded-2xl overflow-hidden flex-row items-center justify-between px-5 py-5">
      <View className=" flex flex-row  items-center">
        <Image source={icon} className="w-[50px] h-[50px] mr-2"></Image>
        <Text className="text-white font-exoBold   xs:text-xs">
          {name.toLocaleUpperCase()}
        </Text>
      </View>

      {/* Render's Name */}
      <View className=" items-center my-2 flex-row justify-between  mr-3 ml-2">
        {children}
      </View>
    </Animated.View>
  );
};

export default React.memo(HomeLesson);
