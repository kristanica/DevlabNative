import StageCodingEditor from "@/assets/components/CodeEditor/StageCodingEditor";
import StageCodingEditorDatabase from "@/assets/components/CodeEditor/StageCodingEditorDatabase";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import FillScreenLoading from "@/assets/components/global/FillScreenLoading";
import RenderCounter from "@/assets/components/global/RenderCounter";
import SelectLanguageNavigation from "@/assets/components/LanguageNavigation/SelectLanguageNavigation";
import ItemList from "@/assets/components/LessonsComponent/ItemList";
import ModalHandler from "@/assets/components/LessonsComponent/Modals/ModalHandler";
import SwipeLessonContainer from "@/assets/components/LessonsComponent/SwipeLessonContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import StageGameComponent from "@/assets/Hooks/function/StageGameComponent";
import { useHandleFinalAnswer } from "@/assets/Hooks/function/useHandleFinalAnswer";

import useCodeEditor from "@/assets/Hooks/useCodeEditor";
import { useCodeEditorDatabase } from "@/assets/Hooks/useCodeEditorDatabase";
import stageStore from "@/assets/zustand/stageStore";

import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import userHp from "@/assets/zustand/userHp";
import { WhereIsUser } from "@/assets/zustand/WhereIsUser";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsMutating } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Pressable, Text, View } from "react-native";
const StageScreen = () => {
  RenderCounter("stage screen");
  const { stageId, lessonId, levelId, category } = useLocalSearchParams();
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const gameIdentifier = useRef<string | undefined>("Lesson");
  const [evaluationData, setEvaluationData] = useState<any>();

  //zustand
  const levelProgress = useGetUserInfo((state) => state.allProgressLevels);

  const setLocation = WhereIsUser((state) => state.setLocation);
  const healthPoints = userHp((state) => state.userHp);
  const stageData = stageStore((state) => state.stageData);
  const currentStageData = stageData?.[currentStageIndex] ?? null;
  const databaseQueryingFunctions = useCodeEditorDatabase();
  const currentStageType = currentStageData?.type ?? "Lesson";

  const isMutating = useIsMutating();

  const handlePrevious = useCallback(() => {
    setCurrentStageIndex((prev) => {
      if (prev <= 0) {
        console.log("last stage");
        return prev;
      }
      const newIndex = prev - 1;
      console.log("UPDATED INDEX:", newIndex);
      return newIndex;
    });
  }, []);
  const handleBackPress = useCallback(() => {
    router.replace({ pathname: "/home/Home" });
  }, [currentStageIndex]);

  //useMemo

  const levelKey = useMemo(() => `${lessonId}-${levelId}`, [lessonId, levelId]);
  const currentStageKey = useMemo(
    () => `${lessonId}-${levelId}-${currentStageData.id}`,
    [lessonId, lessonId, currentStageData.id]
  );
  const isRewardClaimed = useMemo(
    () =>
      levelProgress?.[String(category)]?.[levelKey]?.isRewardClaimed ?? false,
    [levelProgress, levelKey, category]
  );

  useEffect(() => {
    if (!stageData) return;

    const index: number = stageData.findIndex(
      (stage: any) => stage.id === stageId
    );

    setCurrentStageIndex(index);
    const stage = index !== -1 ? stageData[index] : null;

    if (stage?.type) {
      setLocation(stage.type as string);
    }
    if (stage?.type !== "Lesson") {
      gameIdentifier.current = stage?.type;
      console.log(gameIdentifier.current);
    }
  }, [stageId, stageData]);

  useEffect(() => {
    if (!stageData || !stageData[currentStageIndex]) return;
    const currentStage = stageData[currentStageIndex];

    if (currentStage?.type) {
      setLocation(currentStage.type as string);
    }

    if (currentStage?.type !== "Lesson") {
      gameIdentifier.current = currentStage?.type;
    }
  }, [currentStageIndex, stageData, setLocation]);
  const {
    handleFinalAnswer,
    handleEvaluation,
    evaluateModal,
    levelFinishedModal,
    finalAnswerModall,
    feedBackModal,
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
  const feedbackArray = useRef<
    { stageId: string; evaluation: string; feedback: string }[]
  >([]);

  const {
    webRef,
    sendToWebView,
    receivedCode,
    setReceivedCode,
    setLogs,
    logs,
    terminalRef,
  } = useCodeEditor();

  return (
    <ProtectedRoutes>
      <View className="flex-1 bg-background p-3">
        {isMutating > 0 && <FillScreenLoading></FillScreenLoading>}
        <CustomGeneralContainer>
          <View className="flex-row justify-between items-center mb-5">
            <Pressable onPress={handleBackPress}>
              <Text className="font-exoBold text-white px-5 py-2 mx-3 bg-shopAccent rounded-3xl">
                Back
              </Text>
            </Pressable>

            {category !== "Database" && (
              <>
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
              </>
            )}
          </View>
          <ModalHandler
            feedbackArray={feedbackArray}
            feedBackModal={feedBackModal}
            setEvaluationData={setEvaluationData}
            evaluationData={evaluationData}
            currentStageType={currentStageType}
            isRewardClaimed={isRewardClaimed}
            queryRecievedCode={databaseQueryingFunctions.queryRecievedCode}
            lessonId={String(lessonId)}
            levelFinishedModal={levelFinishedModal}
            evaluateModal={evaluateModal}
            finalAnswerModall={finalAnswerModall}
            evaluationLessonMutation={evaluationLessonMutation}
            handleFinalAnswer={handleFinalAnswer}
            receivedCode={receivedCode}
            stageData={stageData}
            category={String(category)}
          ></ModalHandler>
          {/* Shows modal for first time */}

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
              category={category}
              lessonId={lessonId}
              levelId={levelId}
              stageId={currentStageData?.id}
              setCurrentStageIndex={setCurrentStageIndex}
            ></StageGameComponent>

            {/* Determines the gamemode */}
            <View className="flex-row justify-evenly">
              <Pressable onPress={handlePrevious}>
                {currentStageData?.type === "Lesson" && (
                  <Text className="px-7 py-2 bg-[#E63946] self-start  text-white rounded-3xl font-exoRegular">
                    Prev
                  </Text>
                )}
              </Pressable>

              {currentStageData?.type === "Lesson" && (
                <Pressable
                  onPress={() => {
                    if (category === "Database") {
                      console.log("this should run huhu");
                      handleEvaluation(
                        databaseQueryingFunctions.queryRecievedCode.query
                      );
                      return;
                    }

                    handleEvaluation(receivedCode);
                  }}
                  className="mx-auto"
                >
                  <Text className="px-7 py-2 bg-button self-start rounded-3xl font-exoRegular text-whte text-white">
                    Evaluate
                  </Text>
                </Pressable>
              )}
              {currentStageData?.type !== "BrainBytes" && (
                <Pressable
                  onPress={() => {
                    finalAnswerModall.setVisibility(true);
                  }}
                >
                  <Text className="px-7 py-2 bg-[#2ECC71] text-white self-start rounded-3xl font-exoRegular">
                    Next
                  </Text>
                </Pressable>
              )}
            </View>
          </SwipeLessonContainer>
        </CustomGeneralContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default StageScreen;
