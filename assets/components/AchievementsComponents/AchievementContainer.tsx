import useSequentialAppearAnim from "@/assets/Hooks/useSequentialAppearAnim";
import React, { memo, useEffect } from "react";
import { Image, Text, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type AchievementContainerProps = {
  name: string;
  description: string;
  id: number;
  complete: boolean;

  selectedCategory: string;
};

//Achievement Container for (Tabs)/Achievements.tsx
const AchievementContainer = ({
  name,
  description,
  id,
  complete,

  selectedCategory,
}: AchievementContainerProps) => {
  const interpolateVal = useSharedValue(0);

  const { onScale } = useSequentialAppearAnim({
    indicator: selectedCategory,
    id: id,
  });

  const changeBackground = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      interpolateVal.value,
      [0, 0.33, 0.66, 1],
      ["#00FFE0", "#8C52FF", "#FF52A2", "#FFD700"]
    ),
  }));

  useEffect(() => {
    interpolateVal.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true
    );
  }, []);
  return (
    <View key={id}>
      {/* Border gradient for completed achievements*/}
      <Animated.View
        style={[onScale, changeBackground]}
        className="w-[170px] h-[250px] rounded-[20px] mb-[10px] m-[3px] "
      >
        {/* If Achievement is incomplete, will render background color as black */}
        <View
          className=" h-full w-full absolute "
          style={{
            backgroundColor: complete ? undefined : "black",
            borderRadius: 20,
          }}
        >
          {/* The whole container for an Achievement */}
          <View
            className="bg-[#111827] rounded-3xl m-[1px] flex-col flex-1 "
            // If Achievement is incomplete, will render opacity color as 0.5 to darken. If not, will render it normally
            style={[{ opacity: complete ? 1 : 0.5 }]}
          >
            <View className="flex-[2] justify-center items-center">
              <Image
                source={require("@/assets/images/success.png")}
                style={{ height: 75, width: 75 }}
              />
            </View>
            {/* Render the name of Achievement */}
            <View className="flex-[.5] justify-center items-center border-t-2 b-black mx-5">
              <Text className="text-white font-exoExtraBold">{name}</Text>
            </View>
            {/* Render the Description of Achievement */}
            <View className="flex-[.5] justify-center items-center">
              <Text className="text-[#94A1B2] text-center font-exoLight">
                {description}
              </Text>
            </View>

            {/* Renders Incomplete or Complete and also background color */}
            <View
              // If complete, will render green. If not, will render red
              style={{
                backgroundColor: complete ? "#1ABC9C" : "#FF6166",
              }}
              className="flex-[.5] justify-center items-center mx-10 my-2 rounded-3xl"
            >
              <Text className="text-white text-center font-exoBold">
                {complete ? "Completed" : "Inprogress"}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default memo(AchievementContainer);
// Style for linear Gradient
