import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import { useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

const stageScreen = () => {
  const { stageId, lessonId, levelId, category } = useLocalSearchParams();

  const [currentStageIndex, setcurrentStageIndex] = useState<number>(0);
  const [currentStageData, setCurrentStageData] = useState<any>();
  const queryClient = useQueryClient();

  const stageData: any = queryClient.getQueryData([
    "Stages",
    category,
    lessonId,
    levelId,
  ]);

  useEffect(() => {
    if (!stageData) return;
    const index: number = stageData.findIndex(
      (stage: any) => stage.id === stageId
    );
    setcurrentStageIndex(index);
    setCurrentStageData(index !== -1 ? stageData[index] : null);
  }, [stageId, stageData]);

  return (
    <ProtectedRoutes>
      <View className="flex-1 bg-accent p-3">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <Text className="text-white font-exoBold text-3xl">
              {currentStageData?.title}
            </Text>
            <Text className="text-white font-exoRegular text-xl my-3">
              {currentStageData?.description}
            </Text>

            <View className="bg-accentContainer p-3 rounded-3xl my-3">
              <Text className="font-exoBold text-2xl text-white">
                Instructions
              </Text>
              <Text className="text-white font-exoRegular text-lg text-justify my-3">
                {currentStageData?.instruction}
              </Text>
              <View className="bg-background p-3 rounded-3xl my-3">
                <Text className="text-white font-exoRegular text-lg text-justify">
                  {currentStageData?.codingInterface}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-evenly">
              <Pressable
                onPress={() => {
                  router.push({
                    pathname: "/(user)/home/(Lessons)/category/stage/[stageId]",
                    params: {
                      stageId:
                        stageData[
                          currentStageIndex === 0 ? 0 : currentStageIndex - 1
                        ].id,
                      lessonId,
                      levelId,
                      category,
                    },
                  });
                }}
              >
                <Text className="px-7 py-2 bg-red-300 self-start rounded-3xl">
                  Prev
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  if (stageData && currentStageIndex < stageData.length - 1) {
                    router.push({
                      pathname:
                        "/(user)/home/(Lessons)/category/stage/[stageId]",
                      params: {
                        stageId: stageData[currentStageIndex + 1].id,
                        lessonId,
                        levelId,
                        category,
                      },
                    });
                  }
                }}
              >
                <Text className="px-7 py-2 bg-green-300 self-start rounded-3xl">
                  Next
                </Text>
              </Pressable>
            </View>

            <Pressable
              onPress={() => {
                router.push({ pathname: "/home/category/stage/EditorView" });
              }}
            >
              <Text className="px-7 py-2 bg-green-300 self-start rounded-3xl">
                Code Editor
              </Text>
            </Pressable>
          </CustomGeneralContainer>
        </AnimatedViewContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default stageScreen;
