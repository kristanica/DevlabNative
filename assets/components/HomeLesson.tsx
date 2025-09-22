import React, { ReactNode } from "react";

import { useIsFocused } from "@react-navigation/native";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";
import useSequentialAppearAnim from "../Hooks/useSequentialAppearAnim";

type HomeLessonProps = {
  name: string;
  color: string;
  index: number;
  // Recieves icon for <Ionicons>

  children: ReactNode;
};
// HomeLesson component for (Tabs)/Home.tsx
const HomeLesson = ({ name, color, children, index }: HomeLessonProps) => {
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
        className="h-3/4 justify-center items-center rounded-br-none rounded-bl-none"
      >
        {children}
      </View>
      {/* Render's Name */}
      <View className=" justify-center items-center">
        <Text className="text-white font-exoBold  xs:text-xs">{name}</Text>
      </View>
    </Animated.View>
  );
};

export default React.memo(HomeLesson);
