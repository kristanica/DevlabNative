import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { categoryIcon, lessonMetaData } from "../constants/constants";

type HomeLessonProps = {
  name: string;
  closeModal: any;
  index: number;
};

// Lesson container component for (tabs)/Lesson.tsx
const LessonsContainer = ({ name, closeModal, index }: HomeLessonProps) => {
  const id = name as keyof typeof lessonMetaData;
  const meta = lessonMetaData[id];

  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/home/category/[categoryId]",
          params: { categoryId: id },
        });
        closeModal();
      }}
      className="mt-3"
    >
      <View className="flex-row">
        <View className="m-auto">
          <Image
            source={categoryIcon[id]}
            className="h-[50px] w-[50px]"
          ></Image>
        </View>

        <View className="flex-[2]  flex-col ml-4">
          <Text className="text-white text-lg xs:text-[12px] font-exoBold ">
            {meta.title}
          </Text>

          <Text
            className="text-white  xs:text-[8px] opacity-50 text-justify"
            numberOfLines={2}
          >
            {meta.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LessonsContainer;
