import { fontFamily } from "@/fontFamily/fontFamily";
import React, { useEffect } from "react";
import { Dimensions, Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type AchievementSegmentControlProps = {
  mockData: any;
  setCategory: (val: any) => void;
  setSelectedCategory: (value: string) => void;
  selectedCategory: string;
};

const { width } = Dimensions.get("screen");
const itemWidth = width / 3.8;

const AchievementSegmentControl = ({
  mockData,
  setCategory,
  setSelectedCategory,
  selectedCategory,
}: AchievementSegmentControlProps) => {
  const left = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    left: left.value,
  }));

  useEffect(() => {
    left.value = withTiming(
      100 *
        mockData.findIndex(
          (item: { name: string }) => item.name === selectedCategory
        ),
      { duration: 300 }
    );
  }, [selectedCategory, mockData]);

  return (
    <>
      <Animated.View
        className="absolute border-black border-[3px] rounded-3xl w-[90px] h-[30px]"
        style={[{}, animatedStyle]}
      />

      {mockData.map((item: any) => (
        <Pressable
          onPress={() => {
            setCategory(item.data);
            setSelectedCategory(item.name);
          }}
          key={item.id}
          style={{
            width: itemWidth,
          }}
        >
          <Text
            className="text-white "
            style={{ fontFamily: fontFamily.ExoBold }}
          >
            {item.name}
          </Text>
        </Pressable>
      ))}
    </>
  );
};

export default AchievementSegmentControl;

const styles = StyleSheet.create({});
