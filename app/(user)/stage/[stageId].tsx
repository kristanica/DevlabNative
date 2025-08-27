import CodingPlaygroundEditor from "@/assets/components/CodeEditor/CodingPlaygroundEditor";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import SelectLanguageNavigation from "@/assets/components/LanguageNavigation/SelectLanguageNavigation";
import SwipeLessonContainer from "@/assets/components/LessonsComponent/SwipeLessonContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import useCodeEditor from "@/assets/Hooks/useCodeEditor";
import stageStore from "@/assets/zustand/stageStore";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

const stageScreen = () => {
  const { stageId, lessonId, levelId, category } = useLocalSearchParams();

  const [currentStageIndex, setcurrentStageIndex] = useState<number>(0);
  const [currentStageData, setCurrentStageData] = useState<any>();

  const stageData = stageStore((state) => state.stageData);

  useEffect(() => {
    if (!stageData) {
      console.log("undefined");
      return;
    }
    const index: number = stageData.findIndex(
      (stage: any) => stage.id === stageId
    );
    setcurrentStageIndex(index);
    setCurrentStageData(index !== -1 ? stageData[index] : null);
  }, [stageId, stageData]);
  const { webRef, sendToWebView } = useCodeEditor();
  return (
    <ProtectedRoutes>
      <View className="flex-1 bg-background p-3">
        <CustomGeneralContainer>
          <View className="flex-row justify-between items-center">
            <Pressable
              onPress={() =>
                router.replace({ pathname: "/(user)/home/(Lessons)/Lesson" })
              }
            >
              <Text className="font-exoBold text-white px-5 py-2 mx-3 bg-shopAccent rounded-3xl">
                Back
              </Text>
            </Pressable>

            <SelectLanguageNavigation
              isJs={true}
              isCss={true}
              isHtml={true}
              sendToWebView={sendToWebView}
            />
          </View>

          <CodingPlaygroundEditor webRef={webRef}></CodingPlaygroundEditor>
          <SwipeLessonContainer>
            {/* <ScrollView> */}
            <Text className="text-white font-exoBold xs:text-xl text-justify">
              {currentStageData?.title}
            </Text>
            <Text className="text-white font-exoRegular xs:text-xs my-3 text-justify">
              {currentStageData?.description}
            </Text>
            <View className="bg-accentContainer p-3 rounded-3xl my-3">
              <Text className="font-exoBold text-xl text-white">
                Instructions
              </Text>
              <Text className="text-white font-exoRegular xs:text-xs text-justify my-3">
                {currentStageData?.instruction}
              </Text>
              <View className="bg-background p-3 rounded-3xl my-3">
                <Text className="text-white font-exoRegular xs:text-xs text-justify">
                  {currentStageData?.codingInterface}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-evenly">
              <Pressable
                onPress={() => {
                  router.push({
                    pathname: "/stage/[stageId]",
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
                <Text className="px-7 py-2 bg-[#E63946] self-start rounded-3xl font-exoRegular">
                  Prev
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  if (stageData && currentStageIndex < stageData.length - 1) {
                    router.push({
                      pathname: "/stage/[stageId]",
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
                <Text className="px-7 py-2 bg-[#2ECC71] self-start rounded-3xl font-exoRegular">
                  Next
                </Text>
              </Pressable>
            </View>
            {/* </ScrollView> */}
          </SwipeLessonContainer>
        </CustomGeneralContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default stageScreen;
