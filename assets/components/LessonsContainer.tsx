import Ionicons from "@expo/vector-icons/Ionicons";
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
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/home/category/[categoryId]",
          params: { categoryId: id },
        });
      }}
      className="mt-3"
    >
      <View className="flex-row">
        <View className="m-auto">
          <Ionicons name="logo-html5" size={50} color={"white"} />
        </View>

        <View className="flex-[2]  flex-col">
          <Text className="text-white xs:text-lg font-exoBold my-3">
            {meta.title}
          </Text>

          <Text
            className="text-white  xs:text-[8px] text-justify"
            numberOfLines={2}
          >
            {meta.description}
          </Text>
        </View>
      </View>
    </Pressable>
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
