import StageCodingEditor from "@/assets/components/CodeEditor/StageCodingEditor";
import StageCodingEditorDatabase from "@/assets/components/CodeEditor/StageCodingEditorDatabase";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import FillScreenLoading from "@/assets/components/global/FillScreenLoading";
import SelectLanguageNavigation from "@/assets/components/LanguageNavigation/SelectLanguageNavigation";
import ItemList from "@/assets/components/LessonsComponent/ItemList";
import ModalHandler from "@/assets/components/LessonsComponent/Modals/ModalHandler";
import SwipeLessonContainer from "@/assets/components/LessonsComponent/SwipeLessonContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import StageGameComponent from "@/assets/Hooks/function/StageGameComponent";
import StageModalComponent from "@/assets/Hooks/function/StageModalComponent";
import { useHandleFinalAnswer } from "@/assets/Hooks/function/useHandleFinalAnswer";

import useCodeEditor from "@/assets/Hooks/useCodeEditor";
import { useCodeEditorDatabase } from "@/assets/Hooks/useCodeEditorDatabase";
import useModal from "@/assets/Hooks/useModal";
import stageStore from "@/assets/zustand/stageStore";

import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { userHealthPoints } from "@/assets/zustand/userHealthPoints";
import userHp from "@/assets/zustand/userHp";
import { WhereIsUser } from "@/assets/zustand/WhereIsUser";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsMutating } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";
const StageScreen = () => {
  const { stageId, lessonId, levelId, category } = useLocalSearchParams();

  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);

  const healthPoints = userHp((state) => state.userHp);

  //gets the stageData from zustand to reduce API calls
  const stageData = stageStore((state) => state.stageData);
  const currentStageData = stageData?.[currentStageIndex] ?? null;
  const gameIdentifier = useRef<string | undefined>("Lesson");

  const levelProgress = useGetUserInfo((state) => state.allProgressLevels);

  const isRewardClaimed =
    levelProgress["Html"][`${lessonId}-${levelId}`].rewardClaimed;
  useEffect(() => {
    if (levelProgress["Html"][`${lessonId}-${levelId}`].rewardClaimed) {
      Toast.show({});
      return;
    }
  }, [isRewardClaimed, lessonId, levelId, levelProgress]);

  //gets the current index of the stageData
  const setLocation = WhereIsUser((state) => state.setLocation);
  useEffect(() => {
    if (!stageData) return;
    const index: number = stageData.findIndex(
      (stage: any) => stage.id === stageId
    );
    setCurrentStageIndex(index);
    const stage = index !== -1 ? stageData[index] : null;

    setLocation(stage?.type! as string);
    if (stage?.type !== "Lesson") {
      gameIdentifier.current = stage?.type;
      console.log(gameIdentifier.current);
    }
  }, [stageId, stageData, setLocation]);
  const currentStageType = currentStageData?.type ?? "Lesson"; // default fallback
  const {
    handleFinalAnswer,
    handleEvaluation,
    evaluateModal,
    levelFinishedModal,
    finalAnswerModall,
    evaluationLessonMutation,
  } = useHandleFinalAnswer({
    lessonId: String(lessonId),
    levelId: String(levelId),
    stageId: String(stageId),
    category: String(category),
    gameIdentifier: gameIdentifier,
    currentStageDataType: currentStageType,
    setCurrentStageIndex: setCurrentStageIndex,
    currentStageIndex: currentStageIndex,
    currentStageData: currentStageData,
  });

  const {
    webRef,
    sendToWebView,
    receivedCode,
    setReceivedCode,
    setLogs,
    logs,
    terminalRef,
  } = useCodeEditor();

  const databaseQueryingFunctions = useCodeEditorDatabase();

  const health = userHealthPoints((state) => state.health);

  const gameOver = useModal();

  //Handlers
  const isMutating = useIsMutating();

  const handlePrevious = useCallback(() => {
    setCurrentStageIndex((prev) => prev - 1);
  }, []);

  const handleGameOver = useCallback(() => {
    setCurrentStageIndex(0);

    gameOver.closeModal();
  }, [gameOver]);
  console.log(currentStageData);
  return (
    <ProtectedRoutes>
      <View className="flex-1 bg-background p-3">
        {isMutating > 0 && <FillScreenLoading></FillScreenLoading>}
        <CustomGeneralContainer>
          <View className="flex-row justify-between items-center mb-5">
            <Pressable
              onPress={() => router.replace({ pathname: "/home/Home" })}
            >
              <Text className="font-exoBold text-white px-5 py-2 mx-3 bg-shopAccent rounded-3xl">
                Back
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                terminalRef.current?.expand();
              }}
            >
              <Ionicons name="terminal" size={20} color="white" />
            </Pressable>
            <SelectLanguageNavigation
              subject={String(category)}
              sendToWebView={sendToWebView}
            />
          </View>
          <ModalHandler
            lessonId={String(lessonId)}
            gameOver={gameOver}
            levelFinishedModal={levelFinishedModal}
            evaluateModal={evaluateModal}
            finalAnswerModall={finalAnswerModall}
            evaluationLessonMutation={evaluationLessonMutation}
            handleFinalAnswer={handleFinalAnswer}
            receivedCode={receivedCode}
            stageData={stageData}
            health={health}
            handleGameOver={handleGameOver}
            category={String(category)}
          ></ModalHandler>
          {/* Shows modal for first time */}
          <StageModalComponent
            type={gameIdentifier.current}
          ></StageModalComponent>
          {category === "Database" ? (
            <StageCodingEditorDatabase
              {...databaseQueryingFunctions}
            ></StageCodingEditorDatabase>
          ) : (
            <StageCodingEditor
              terminalRef={terminalRef}
              webRef={webRef}
              receivedCode={receivedCode}
              setReceivedCode={setReceivedCode}
              setLogs={setLogs}
              logs={logs}
            ></StageCodingEditor>
          )}
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
                  if (
                    stageData[currentStageIndex - 1] === undefined ||
                    stageData[currentStageIndex - 1] === null
                  ) {
                    return;
                  }
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
                  handleEvaluation(receivedCode);
                }}
                className="mx-auto"
              >
                {currentStageData?.type === "Lesson" && (
                  <Text className="px-7 py-2 bg-button self-start rounded-3xl font-exoRegular text-whte text-white">
                    Evaluate
                  </Text>
                )}
              </Pressable>

              <Pressable
                onPress={() => {
                  finalAnswerModall.setVisibility(true);
                }}
              >
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

export default StageScreen;
