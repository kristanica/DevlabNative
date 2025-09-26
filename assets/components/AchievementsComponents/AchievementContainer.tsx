import useSequentialAppearAnim from "@/assets/Hooks/useSequentialAppearAnim";
import React, { memo, useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type AchievementContainerProps = {
  data: any;
  index: number;
  selectedCategory: string;
  isUnlocked: boolean;
  isClaimed: boolean;
  claimMutation: any;
};

//Achievement Container for (Tabs)/Achievements.tsx
const AchievementContainer = ({
  data,
  selectedCategory,
  isUnlocked,
  index,
  isClaimed,
  claimMutation,
}: AchievementContainerProps) => {
  const interpolateVal = useSharedValue(0);

  const { onScale } = useSequentialAppearAnim({
    indicator: selectedCategory,
    id: index,
  });

  useEffect(() => {
    interpolateVal.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true
    );
  }, []);
  return (
    <View className="justify-center items-center w-1/2">
      <Animated.View
        style={[onScale]}
        className="w-[90%] aspect-[3/5] rounded-[10px]  my-2"
      >
        <View
          className=" h-full w-full absolute "
          style={{
            backgroundColor: isUnlocked ? undefined : "black",
            borderRadius: 20,
          }}
        >
          <View
            className="bg-[#111827] rounded-3xl m-[1px] flex-col flex-1 border-blue-400 border-[1px]"
            style={[{ opacity: isUnlocked ? 1 : 0.5 }]}
          >
            <View className="flex-[2] justify-center items-center">
              <Image
                source={require("@/assets/images/success.png")}
                style={{ height: 70, width: 70 }}
              />
            </View>

            <View className="flex-[.5] justify-center items-center border-t-2 b-black mx-5">
              <Text className="text-white font-exoExtraBold text-lg text-center">
                {data?.title}
              </Text>
            </View>
            {/* Render the Description of Achievement */}
            <View className="flex-[.5] justify-center items-center">
              <Text className="text-[#94A1B2] text-center font-exoLight text-xs px-2">
                {data?.description ?? "No description"}
              </Text>
            </View>

            <View className="flex-[.5] justify-center items-center mx-10 my-2 rounded-3xl">
              {!isUnlocked ? (
                <Text className="text-white text-center text-xs px-2 rounded-xl py-2  bg-[#F87171] font-exoBold">
                  In Progress
                </Text>
              ) : isClaimed ? (
                <Text className="text-white bg-[#22C55E]  px-2 rounded-xl py-2  text-center text-xs font-exoBold">
                  Completed
                </Text>
              ) : (
                <TouchableOpacity onPress={claimMutation}>
                  <Text className="text-white bg-[#EC4899] px-2 rounded-xl py-2  text-center text-xs font-exoBold">
                    Claim
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default memo(AchievementContainer);
// Style for linear Gradient
