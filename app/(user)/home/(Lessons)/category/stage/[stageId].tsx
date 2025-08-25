import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import { db } from "@/assets/constants/constants";
import stages from "@/assets/zustand/stages";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React from "react";
import { Pressable, Text, View } from "react-native";

type StageForNavigation = {
  id: string;
  order: number;
  codingInterface?: string;
  description: string;
  instruction: string;
  title: string | undefined | null;
};
const stageScreen = () => {
  const { stageId, lessonId, levelId, category } = useLocalSearchParams();
  console.log(stageId, lessonId, levelId, category);

  const { data: stageData } = useQuery<StageForNavigation[] | null>({
    queryKey: ["Stage user data", category, lessonId, lessonId, stageId],

    queryFn: async () => {
      try {
        const stagesRef = collection(
          db,
          String(category),
          String(lessonId),
          "Levels",
          String(levelId),
          "Stages"
        );
        const queryByOrder = query(stagesRef, orderBy("order"));
        const stagesDocs = await getDocs(queryByOrder);
        return stagesDocs.docs.map((doc) => {
          return {
            id: doc.id,
            ...(doc.data() as {
              order: number;
              codingInterface?: string;
              description: string;
              instruction: string;
              title: string | undefined | null;
            }),
          };
        });
      } catch (error) {
        return null;
      }
    },
  });
  const currentIndex =
    stageData?.findIndex((stage) => stage.id === stageId) ?? 0;
  const currentStage = stageData ? stageData[currentIndex] : null;

  const setSpecificStageData = stages((state) => state.setSpecificStagePayload);
  setSpecificStageData({ currentStage });
  return (
    <ProtectedRoutes>
      <View className="flex-1 bg-accent p-3">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <Text className="text-white font-exoBold text-3xl">
              {currentStage?.title}
            </Text>
            <Text className="text-white font-exoRegular text-xl my-3">
              {currentStage?.description}
            </Text>

            <View className="bg-accentContainer p-3 rounded-3xl my-3">
              <Text className="font-exoBold text-2xl text-white">
                Instructions
              </Text>
              <Text className="text-white font-exoRegular text-lg text-justify my-3">
                {currentStage?.instruction}
              </Text>
              <View className="bg-background p-3 rounded-3xl my-3">
                <Text className="text-white font-exoRegular text-lg text-justify">
                  {currentStage?.codingInterface}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-evenly">
              <Pressable
                onPress={() => {
                  if (stageData && currentIndex > 0) {
                    router.push({
                      pathname:
                        "/(user)/home/(Lessons)/category/stage/[stageId]",
                      params: {
                        stageId: stageData[currentIndex - 1].id,
                        lessonId,
                        levelId,
                        category,
                      },
                    });
                  }
                }}
              >
                <Text className="px-7 py-2 bg-red-300 self-start rounded-3xl">
                  Prev
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  if (stageData && currentIndex < stageData.length - 1) {
                    router.push({
                      pathname:
                        "/(user)/home/(Lessons)/category/stage/[stageId]",
                      params: {
                        stageId: stageData[currentIndex + 1].id,
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
