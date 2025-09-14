import useSequentialAppearAnim from "@/assets/Hooks/useSequentialAppearAnim";
import { useIsFocused } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";

type StageContainerProps = {
  item: any;
  index: number;
  category?: string;
};

const StageContainer = ({ item, index, category }: StageContainerProps) => {
  const queryClient = useQueryClient();
  const isFocused = useIsFocused();
  const { onScale } = useSequentialAppearAnim({
    indicator: isFocused,
    id: index,
  });

  // const mutation = useMutation({
  //   mutationFn: ({
  //     subject,
  //     lessonId,
  //     levelId,
  //   }: {
  //     subject: string;
  //     lessonId: string;
  //     levelId: string;
  //   }) => addNewTopic(subject, lessonId, levelId),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["lesson admin", category] });
  //   },
  // });

  return (
    <Animated.View
      style={onScale}
      className="bg-[#111827] my-2 rounded-2xl border-[2px] border-black h-40 p-3 mx-3"
    >
      <View>
        <Text className="text-white font-exoBold text-2xl">{item.title}</Text>
      </View>

      <View className="mt-2">
        <Text
          className="text-[#94A1B2] text-sm  text-justify font-exoLight "
          numberOfLines={2}
        >
          {item.description}
        </Text>
      </View>

      <View className="my-2">
        <Text className="text-white font-exoBold text-sm">
          {item?.isHidden ? "Game" : "Lesson"}
        </Text>
      </View>
    </Animated.View>
  );
};

export default StageContainer;
