import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const ProgressBar = ({
  category,
  userProgress,
  activeLevel,
  onDeleteSpecific,
}: any) => {
  const animatedStye = useAnimatedStyle(() => {
    const percentage = (userProgress / activeLevel) * 100;
    return {
      width: withTiming(`${percentage}%`, {
        duration: 1000,
      }),
    };
  }, [userProgress, activeLevel]);
  const categoryColors: Record<string, string> = {
    Html: "#FF6B4A",
    Css: "#5AB4FF",
    JavaScript: "#FFE156",
    Database: "#4DB6AC",
  };

  const barColor = categoryColors[category] || "#A8E6CF"; // fallback
  return (
    <View className="bg-modal justify-center items-center mt-2  p-2 rounded-lg">
      {/* Label above progress bar */}
      <View className="flex-row justify-between w-full mb-1">
        <TouchableOpacity
          onPress={onDeleteSpecific}
          disabled={userProgress <= 0}
          className="flex-row justify-center items-center"
        >
          <Ionicons
            name="trash-bin"
            color={userProgress <= 0 ? "gray" : "red"}
            size={20}
            style={{ marginRight: 20 }}
          ></Ionicons>
          <Text className="text-white text-xs font-exoBold">
            {category.toUpperCase()}
          </Text>
        </TouchableOpacity>
        <Text className="text-white/60 text-xs">
          {userProgress} / {activeLevel}
        </Text>
      </View>
      {/* Progress bar container */}
      <View className="w-full bg-[#1E212F] h-[10px] rounded-full overflow-hidden">
        <Animated.View
          style={[
            animatedStye,
            {
              backgroundColor: barColor,
              height: "100%",
            },
          ]}
        />
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({});
