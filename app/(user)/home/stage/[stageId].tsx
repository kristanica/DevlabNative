import CodingPlaygroundEditor from "@/assets/components/CodeEditor/CodingPlaygroundEditor";
import EvaluateModal from "@/assets/components/CodeEditor/EvaluateModal";
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
import useEvaluation from "@/assets/Hooks/query/mutation/useEvaluation";

import useCodeEditor from "@/assets/Hooks/useCodeEditor";
import useModal from "@/assets/Hooks/useModal";
import stageStore from "@/assets/zustand/stageStore";
import { userHealthPoints } from "@/assets/zustand/userHealthPoints";
import userHp from "@/assets/zustand/userHp";
import { WhereIsUser } from "@/assets/zustand/WhereIsUser";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";
const stageScreen = () => {
  const { stageId, lessonId, levelId, category } = useLocalSearchParams();

  const [currentStageIndex, setcurrentStageIndex] = useState<number>(0);

  const healthPoints = userHp((state) => state.userHp);

  //gets the stageData from zustand to reduce API calls
  const stageData = stageStore((state) => state.stageData);
  const currentStageData = stageData?.[currentStageIndex] ?? null;
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

    setLocation(stage?.type! as string);
    if (stage?.type !== "Lesson") {
      gameIdentifier.current = stage?.type;
      console.log(gameIdentifier.current);
    }
  }, [stageId, stageData]);

  const { evaluationMutation } = useEvaluation();

  const { webRef, sendToWebView, receivedCode, setReceivedCode } =
    useCodeEditor();

  const health = userHealthPoints((state) => state.health);
  const resetHealthPoints = userHealthPoints((state) => state.resetUserHealth);
  const finalAnswer = useModal();
  const gameOver = useModal();
  const levelFinished = useModal();
  const evaluateModal = useModal();

  const { nextStage } = useSubmitAnswer();

  //Handlers
  const handleFinalAnswer = () => {
    if (!receivedCode) {
      setTimeout(() => {
        nextStage.mutate({
          setcurrentStageIndex: setcurrentStageIndex,
          stageId: stageData[currentStageIndex].id,
          resetStage: stageData[0].id,
          lessonId: String(lessonId),
          levelId: String(levelId),
          category: String(category),
          answer: false,
        });
      }, 200);
      showToast("error");
      finalAnswer.setVisibility(false);

      return;
    }

    evaluationMutation.mutate(
      {
        receivedCode: receivedCode,
        instruction: currentStageData.instruction,
        description: currentStageData.description,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          if (stageData.length - 1 === currentStageIndex) {
            finalAnswer.closeModal();
            setTimeout(() => levelFinished.setVisibility(true), 200);
            return;
          }

          if (stageData && currentStageIndex < stageData.length - 1) {
            finalAnswer.closeModal();
            const toastResult = data.correct ? "success" : "error";
            showToast(toastResult);
            nextStage.mutate({
              stageId: stageData[currentStageIndex].id,
              resetStage: stageData[0].id,
              lessonId: String(lessonId),
              levelId: String(levelId),
              category: String(category),
              answer: data.correct,
              setcurrentStageIndex,
            });
          }
        },
      }
    );
  };
  const handlePrevious = useCallback(() => {
    setcurrentStageIndex((prev) => prev - 1);
  }, [stageData, currentStageIndex, lessonId, levelId, category]);

  const handleNext = useCallback(() => {
    gameIdentifier.current = currentStageData?.type;
    if (gameIdentifier.current !== "Lesson") {
      finalAnswer.setVisibility(true);
      return;
    }
    if (stageData && currentStageIndex < stageData.length - 1) {
      setcurrentStageIndex((prev) => prev + 1);
    }
  }, [stageData, currentStageIndex, lessonId, levelId, category, finalAnswer]);

  const handleGameOver = useCallback(() => {
    setcurrentStageIndex(0);

    gameOver.closeModal();
  }, [stageData, lessonId, levelId, category, resetHealthPoints, gameOver]);

  const showToast = (type: string) => {
    Toast.show({
      type: type,

      visibilityTime: 2000,
      position: "top",
      topOffset: 20,
    });
  };

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
          <Toast
            config={{
              success: () => (
                <View className="h-[50px]  w-52 mx-2 z-50 bg-[#1ABC9C] border-[#ffffffaf] border-[2px] rounded-xl justify-center items-center absolute ">
                  <Text className="text-white xs: text-xs font-exoExtraBold">
                    🎉 You got that right!
                  </Text>
                </View>
              ),
              error: () => (
                <View className="h-[50px]  w-52 mx-2 z-50  bg-[#E63946] border-[#ffffffaf] border-[2px] rounded-xl justify-center items-center absolute">
                  <Text className="text-white xs: text-xs font-exoExtraBold">
                    ⚠️ Oops! somethings wrong!
                  </Text>
                </View>
              ),
            }}
          />
          {health === 0 && gameOver.visibility && (
            <GameOverModal
              onConfirm={() => {
                handleGameOver();
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

          {evaluateModal.visibility && (
            <EvaluateModal
              onConfirm={() => evaluateModal.closeModal()}
              gptResponse={evaluationMutation.data.feedback}
              {...evaluateModal}
            ></EvaluateModal>
          )}

          {/* Shows answer confirmation before navigating to the next one */}
          {finalAnswer.visibility && (
            <FinalAnswerModal
              onConfirm={() => {
                handleFinalAnswer();
              }}
              {...finalAnswer}
            />
          )}
          <StageModalComponent
            type={gameIdentifier.current}
          ></StageModalComponent>
          {/* Shows modal for first time */}

          <CodingPlaygroundEditor
            webRef={webRef}
            receivedCode={receivedCode}
            setReceivedCode={setReceivedCode}
          ></CodingPlaygroundEditor>
          <View className="h-[10px] w-[20px] bg-slate-400"></View>
          <ItemList></ItemList>
          <SwipeLessonContainer>
            <View className="flex-row">
              {currentStageData?.type !== "Lesson" &&
                Array.from({ length: healthPoints }).map((_, index) => (
                  <Ionicons
                    name="heart"
                    size={20}
                    color={"red"}
                    key={index}
                  ></Ionicons>
                ))}
            </View>

            <StageGameComponent
              currentStageData={currentStageData}
              type={currentStageData?.type}
            ></StageGameComponent>

            {/* Determines the gamemode */}
            <View className="flex-row justify-evenly">
              <Pressable
                onPress={() => {
                  handlePrevious();
                }}
              >
                {currentStageData?.type === "Lesson" && (
                  <Text className="px-7 py-2 bg-[#E63946] self-start  text-white rounded-3xl font-exoRegular">
                    Prev
                  </Text>
                )}
              </Pressable>

              <Pressable
                onPress={() => {
                  handlePrevious();
                }}
                className="mx-auto"
              >
                {currentStageData?.type === "Lesson" && (
                  <Text className="px-7 py-2 bg-button self-start rounded-3xl font-exoRegular text-whte text-white">
                    Evaluate
                  </Text>
                )}
              </Pressable>

              <Pressable onPress={() => handleNext()}>
                <Text className="px-7 py-2 bg-[#2ECC71] text-white self-start rounded-3xl font-exoRegular">
                  Next
                </Text>
              </Pressable>
            </View>
          </SwipeLessonContainer>
        </CustomGeneralContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default stageScreen;
