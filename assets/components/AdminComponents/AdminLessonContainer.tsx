import addNewTopic from "@/assets/Hooks/query/mutation/addNewTopic";
import useModal from "@/assets/Hooks/useModal";
import useSequentialAppearAnim from "@/assets/Hooks/useSequentialAppearAnim";
import gameIdentifier from "@/assets/zustand/gameIdentifier";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import AddLessonModal from "./AddLessonModal";

type AdminLessonContainerProps = {
  item: any;
  index: number;
  category: string;
};

const AdminLessonContainer = ({
  item,
  index,
  category,
}: AdminLessonContainerProps) => {
  const queryClient = useQueryClient();
  const isFocused = useIsFocused();
  const { onScale } = useSequentialAppearAnim({
    indicator: isFocused,
    id: index,
  });

  const setGameIdentifier = gameIdentifier((state) => state.setGameIdentifer);

  const mutation = useMutation({
    mutationFn: ({
      subject,
      lessonId,
      levelId,
    }: {
      subject: string;
      lessonId: string;
      levelId: string;
    }) => addNewTopic(subject, lessonId, levelId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lesson admin", category] });
    },
  });

  const { visibility, setVisibility, scaleStyle, closeModal } = useModal();
  return (
    <Animated.View
      style={onScale}
      className="bg-[#111827] my-2 rounded-2xl border-[2px] border-[#56EBFF] h-48 p-3 mx-3"
    >
      <View>
        <Text className="text-white font-exoBold text-2xl">{item.title}</Text>
      </View>

      <View className="my-2">
        <Text className="text-[#94A1B2] text-sm  text-justify font-exoLight ">
          {item.desc}
        </Text>
      </View>

      <View className="flex-row  my-3">
        <View className="w-[90%]">
          <FlatList
            data={[...item.topics].sort(
              (a, b) =>
                parseInt(a.id.match(/\d+/)) - parseInt(b.id.match(/\d+/))
            )}
            horizontal
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: specificTopic }) => (
              <TouchableOpacity
                key={specificTopic.id}
                className="mx-4  bg-button self-start rounded-lg"
                onPress={() => {
                  setGameIdentifier({
                    subject: category,
                    lessonId: item.lessonid,
                    levelId: item.id,
                    topicId: specificTopic.id,
                  });
                  setTimeout(() => {
                    setVisibility(true);
                  }, 100);
                }}
              >
                <Text className="text-white px-2 py-2 ">
                  {specificTopic.id}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <Pressable
          className="justify-center items-center w-[10%]"
          onPress={() => {
            // mutation.mutate({
            //   subject: category,
            //   lessonId: item.lessonid,
            //   levelId: item.id,
            // });
            setVisibility(true);
          }}
        >
          <Ionicons name="pencil" size={25} color="white"></Ionicons>
        </Pressable>
      </View>
      {visibility && (
        <AddLessonModal
          visibility={visibility}
          scaleStyle={scaleStyle}
          closeModal={closeModal}
        ></AddLessonModal>
      )}
    </Animated.View>
  );
};

export default AdminLessonContainer;
