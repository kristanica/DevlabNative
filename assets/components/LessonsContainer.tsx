import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { lessonMetaData } from "../constants/constants";

type HomeLessonProps = {
  name: string;
};

// Lesson container component for (tabs)/Lesson.tsx
const LessonsContainer = ({ name }: HomeLessonProps) => {
  const id = name as keyof typeof lessonMetaData;
  const meta = lessonMetaData[id];

  return (
    // Container iteself
    <View className="w-screen justify-center items-center">
      {/* Gradient background */}

      <View className="w-3/4 xs:w-11/12 sm:w-10/12 md:w-3/4 xs:h-3/4 bg-shopAccent rounded-2xl">
        <LinearGradient
          colors={[meta.gradient.color1, meta.gradient.color2]}
          locations={[0.1, 0.8]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={styles.container}
        >
          {/* The icon itself */}
          <View className="justify-center items-center">
            <Ionicons name="logo-html5" size={100} color={"white"} />
          </View>
          <View className="flex-[2] items-center justify-center ">
            <Text className="text-white xs:text-lg font-exoBold my-3">
              {meta.title}
            </Text>

            <Text className="text-white  xs:text-[8px] text-justify">
              {meta.description}
            </Text>
          </View>
        </LinearGradient>
        <View className="xs:h-1/4 items-center justify-evenly flex-row">
          {/* <View className="w-[70%] h-4 rounded-xl bg-[#D9D9D9] overflow-hidden my-2 drop-shadow-xs ">
            <View className="w-[50%] bg-[#32FF99] h-4 rounded-xl"></View>
          </View> */}
          <Pressable
            onPress={() => {
              router.push({
                pathname: "/(user)/home/(Lessons)/category/[categoryId]",
                params: { categoryId: id },
              });
            }}
          >
            <Text className="text-white  xs:text-xs py-2 px-7 bg-accent rounded-2xl font-exoBold">
              Continue
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LessonsContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 2,
    alignItems: "center",
    height: "80%",
    borderRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
});
