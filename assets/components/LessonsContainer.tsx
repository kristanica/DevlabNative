import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type HomeLessonProps = {
  color1: string;
  color2: string;
};

// Lesson container component for (tabs)/Lesson.tsx
const LessonsContainer = ({ color1, color2 }: HomeLessonProps) => {
  return (
    // Container iteself
    <View className="bg-accentContainer h-[300px] p-2 rounded-xl my-2">
      {/* Gradient background */}

      <LinearGradient
        colors={[color1, color2]}
        locations={[0.1, 0.8]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.container}
      >
        {/* The icon itself */}
        <Ionicons name="logo-html5" size={50} color={"white"} />
      </LinearGradient>

      <View className="flex-1 p-2 justify-between items-center ">
        {/* Renders name */}
        <Text className="text-white text-xl text-center font-exoBold">
          HTML: The Gateway to Web Adventure
        </Text>
        {/* Renders Description */}
        <Text className="text-white  text-center text-xs">
          Every great structure needs a solid foundation—HTML is the skeleton
          that holds the web together! Without it, web pages would collapse into
          chaos
        </Text>
      </View>
      {/* Renders progress bar */}
      <View className="flex-[.5] justify-evenly items-center flex-row flex-wrap">
        <View className="w-[80%] h-4 rounded-xl bg-[#D9D9D9] overflow-hidden my-2 drop-shadow-xs ">
          <View className="w-[80%] bg-[#32FF99] h-4 rounded-xl"></View>
        </View>

        <Text className="text-white">85%</Text>
      </View>
    </View>
  );
};

export default LessonsContainer;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 1,
    height: 200,
    marginVertical: 10,
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
