import { fontFamily } from "@/fontFamily/fontFamily";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { boxShadow } from "../styles/ContainerStyles";

type HomeLessonProps = {
  name: string;
  color: string;
  // Recieves icon for <Ionicons>
  icon: keyof typeof Ionicons.glyphMap;
};
// HomeLesson component for (Tabs)/Home.tsx
const HomeLesson = ({ name, color, icon }: HomeLessonProps) => {
  return (
    <View
      style={[{}, boxShadow.shadow2]}
      className=" w-[40%] h-[200px] bg-accentContainer mx-3 my-2 rounded-2xl overflow-hidden p-2 border-black border-[2px]"
    >
      <View
        style={{ backgroundColor: color }}
        className="flex-1 justify-center items-center rounded-xl"
      >
        <Ionicons name={icon} size={50} color={"white"} />
      </View>
      {/* Render's Name */}
      <View className="flex-[.5] justify-center items-center text-center">
        <Text className="text-white" style={{ fontFamily: fontFamily.ExoBold }}>
          {name}
        </Text>
      </View>
    </View>
  );
};

export default HomeLesson;

const styles = StyleSheet.create({});
