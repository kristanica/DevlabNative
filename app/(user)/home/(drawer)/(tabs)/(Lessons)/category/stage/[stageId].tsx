import CodingPlaygroundEditor from "@/assets/components/CodeEditor/CodingPlaygroundEditor";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import SelectLanguageNavigation from "@/assets/components/LanguageNavigation/SelectLanguageNavigation";
import FinalAnswerModal from "@/assets/components/LessonsComponent/FinalAnswerModal";
import GameOverModal from "@/assets/components/LessonsComponent/GameOverModal";
import ItemList from "@/assets/components/LessonsComponent/ItemList";
import LevelFinishedModal from "@/assets/components/LessonsComponent/LevelFinishedModal";
import SwipeLessonContainer from "@/assets/components/LessonsComponent/SwipeLessonContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import StageGameComponent from "@/assets/Hooks/function/StageGameComponent";
import StageModalComponent from "@/assets/Hooks/function/StageModalComponent";
import useSubmitAnswer from "@/assets/Hooks/function/useSubmitAnswer";

import useCodeEditor from "@/assets/Hooks/useCodeEditor";
import useModal from "@/assets/Hooks/useModal";
import stageStore from "@/assets/zustand/stageStore";
import { userHealthPoints } from "@/assets/zustand/userHealthPoints";
import { WhereIsUser } from "@/assets/zustand/WhereIsUser";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
const stageScreen = () => {
  const { stageId, lessonId, levelId, category } = useLocalSearchParams();

  const [currentStageIndex, setcurrentStageIndex] = useState<number>(0);
  const [currentStageData, setCurrentStageData] = useState<any>();

  //gets the stageData from zustand to reduce API calls
  const stageData = stageStore((state) => state.stageData);

  const gameIdentifier = useRef<string | undefined>("Lesson");

  //gets the current index of the stageData
  const setLocation = WhereIsUser((state) => state.setLocation);

  useEffect(() => {
    if (!stageData) return;
    const index: number = stageData.findIndex(
      (stage: any) => stage.id === stageId
    );
    setcurrentStageIndex(index);
    const stage = index !== -1 ? stageData[index] : null;
    setCurrentStageData(stage);
    setLocation(stage?.type! as string);
    if (stage?.type !== "Lesson") {
      gameIdentifier.current = stage?.type;
      console.log(gameIdentifier.current);
    }
  }, [stageId, stageData]);

  const { webRef, sendToWebView } = useCodeEditor();
  const health = userHealthPoints((state) => state.health);
  const resetHealthPoints = userHealthPoints((state) => state.resetUserHealth);
  const finalAnswer = useModal();
  const gameOver = useModal();
  const levelFinished = useModal();
  const mutate = useSubmitAnswer();

  return (
    <ProtectedRoutes>
      <View className="flex-1 bg-background p-3">
        <CustomGeneralContainer>
          <View className="flex-row justify-between items-center">
            <Pressable
              onPress={() => router.replace({ pathname: "/home/Home" })}
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

          {health === 0 && (
            <GameOverModal
              onConfirm={() => {
                router.replace({
                  pathname: "/home/category/stage/[stageId]",
                  params: {
                    stageId: stageData[0].id,
                    lessonId,
                    levelId,
                    category,
                  },
                });
                resetHealthPoints();
                gameOver.closeModal();
              }}
              {...gameOver}
            ></GameOverModal>
          )}

          {levelFinished.visibility && (
            <LevelFinishedModal
              onConfirm={() => console.log("levelFinished")}
              {...levelFinished}
            ></LevelFinishedModal>
          )}

          {/* Shows answer confirmation before navigating to the next one */}
          {finalAnswer.visibility && (
            <FinalAnswerModal
              onConfirm={() => {
                if (stageData.length - 1 === currentStageIndex) {
                  finalAnswer.closeModal();
                  setTimeout(() => levelFinished.setVisibility(true), 200);
                  return;
                }

                if (stageData && currentStageIndex < stageData.length - 1) {
                  finalAnswer.closeModal();

                  setTimeout(() => {
                    mutate.mutate({
                      stageId: stageData[currentStageIndex].id,
                      resetStage: stageData[0].id,
                      lessonId: String(lessonId),
                      levelId: String(levelId),
                      category: String(category),
                    });
                  }, 200);
                }
              }}
              {...finalAnswer}
            />
          )}
          <StageModalComponent
            type={gameIdentifier.current}
          ></StageModalComponent>
          {/* Shows modal for first time */}

          <CodingPlaygroundEditor webRef={webRef}></CodingPlaygroundEditor>
          <View className="h-[10ox] w-[20px] bg-slate-400"></View>
          <ItemList></ItemList>
          <SwipeLessonContainer>
            {currentStageData?.type !== "Lesson" && (
              <Text className="text-white">HEALTH: {health}</Text>
            )}
            <StageGameComponent
              currentStageData={currentStageData}
              type={currentStageData?.type}
            ></StageGameComponent>

            {/* Determines the gamemode */}
            <View className="flex-row justify-evenly">
              <Pressable
                onPress={() => {
                  router.replace({
                    pathname: "/home/category/stage/[stageId]",
                    params: {
                      stageId:
                        stageData![
                          currentStageIndex === 0 ? 0 : currentStageIndex - 1
                        ].id,
                      lessonId,
                      levelId,
                      category,
                    },
                  });
                }}
              >
                {/* Alam ko mali, pero tinatamad na ako ayusin */}
                {gameIdentifier.current === "Lesson" && (
                  <Text className="px-7 py-2 bg-[#E63946] self-start rounded-3xl font-exoRegular">
                    Prev
                  </Text>
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  if (gameIdentifier.current !== "Lesson") {
                    finalAnswer.setVisibility(true);
                    return;
                  }
                  if (stageData && currentStageIndex < stageData.length - 1) {
                    router.replace({
                      pathname: "/home/category/stage/[stageId]",
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
