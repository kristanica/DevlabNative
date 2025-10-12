import React, { useCallback } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
type AchievementContainerPayload = {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
};
const AchievementSelector = ({
  setSelectedCategory,
  selectedCategory,
}: AchievementContainerPayload) => {
  const category = ["Html", "Css", "JavaScript", "Database"];
  const renderItem = useCallback(
    ({ item }: any) => {
      const isSelected = item === selectedCategory;
      return (
        <Pressable
          onPress={() => {
            setSelectedCategory(item);
          }}
        >
          <Text
            className={`font-exoBold text-xs xs:text-[12px] ${
              isSelected ? "text-white" : "text-gray-400"
            }`}
          >
            {item}
          </Text>
        </Pressable>
      );
    },
    [setSelectedCategory, selectedCategory]
  );
  return (
    <View className=" items-center flex-row border-b-2  py-5  border-accentContainer px-6">
      <FlatList
        alwaysBounceVertical={false}
        showsHorizontalScrollIndicator={false}
        numColumns={4}
        data={category}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AchievementSelector;

const styles = StyleSheet.create({});
