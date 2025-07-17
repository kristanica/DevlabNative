import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import LoadingAnim from "@/assets/components/LoadingAnim";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import { useFetchLessons } from "@/assets/Hooks/query/useFetchLessons";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const levelSceen = () => {
  const { levelid, title, lessonid } = useLocalSearchParams() as {
    levelid: string;
    title: string;
    lessonid: string;
  };

  const { data: levelData, isLoading } = useQuery({
    queryKey: ["level", levelid, title, lessonid],
    queryFn: () => useFetchLessons({ levelid, title, lessonid }),
  });

  return (
    <ProtectedRoutes>
      <View className="flex-1 bg-[#393F59]">
        <CustomGeneralContainer>
          <View className="flex-row justify-between mx-3">
            <Pressable
              className="bg-[#1E1E2E] rounded-2xl"
              onPress={() => router.replace("/(user)/home/(Lessons)/Lesson")}
            >
              <Text className="text-white py-2 px-7 font-exoBold">
                INSTRUCTIONS
              </Text>
            </Pressable>

            <Pressable
              className="bg-[#1E1E2E] rounded-2xl font-exoBold"
              onPress={() =>
                router.push({
                  pathname: "/level/EditorView",
                })
              }
            >
              <Text className="text-white py-2 px-7 font-exoBold">Editor</Text>
            </Pressable>
          </View>
          {isLoading || !levelData ? (
            <LoadingAnim />
          ) : (
            <View key={levelData.id} className="m-3">
              <Text className="text-white font-bold text-3xl py-2 font-exoBold">
                {levelid}: {levelData.title}
              </Text>
              <View className="py-2">
                <Text className="text-white text-lg text-justify font-exoBold">
                  {levelData.desc}
                </Text>
              </View>
              <View className="bg-[#25293B] p-3 rounded-2xl">
                <Text className="text-white text-lg py-2 font-exoBold">
                  Instructions
                </Text>
                <Text className="text-white italic text-lg">
                  {levelData.instruction}
                </Text>

                <View className="bg-[#191C2B] rounded-2xl p-2">
                  <Text className="text-white text-lg font-exoBold">
                    {
                      "<h1>Welcome to Your First Webpage!</h1>\n<p>This is your first step into the world of HTML. Great job!</p>"
                    }
                  </Text>
                </View>
              </View>
            </View>
          )}
        </CustomGeneralContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default levelSceen;
