import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import FillScreenLoading from "@/assets/components/global/FillScreenLoading";
import RenderCounter from "@/assets/components/global/RenderCounter";
import ItemList from "@/assets/components/LessonsComponent/ItemList";
import HintModal from "@/assets/components/LessonsComponent/Modals/HintModal";
import ModalHandler from "@/assets/components/LessonsComponent/Modals/ModalHandler";
import SwipeLessonContainer from "@/assets/components/LessonsComponent/SwipeLessonContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import Hearts from "@/assets/components/RenderItems/Hearts";
import { StageHeader } from "@/assets/components/screen/STAGE/StageHeader";
import { activeBuffsLocal } from "@/assets/Hooks/function/activeBuffsLocal";
import StageGameComponent from "@/assets/Hooks/function/StageGameComponent";
import { useHandleFinalAnswer } from "@/assets/Hooks/function/useHandleFinalAnswer";
import codeWhisper from "@/assets/Hooks/mainGameModeFunctions/globalItems/codeWhisper";
import { RenderStageEditor } from "@/assets/Hooks/stageScreenHandles/RenderStageEditor";
import { useCurrentStageData } from "@/assets/Hooks/stageScreenHandles/useCurrentStageData";
import { useStageNavigation } from "@/assets/Hooks/stageScreenHandles/useStageNavigation";

import useCodeEditor from "@/assets/Hooks/useCodeEditor";
import { useCodeEditorDatabase } from "@/assets/Hooks/useCodeEditorDatabase";
import useModal from "@/assets/Hooks/useModal";

import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { useIsMutating } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const StageScreen = () => {
  RenderCounter("stage screen");

  const { stageId, lessonId, levelId, category } = useLocalSearchParams();
  //feedback on level end setter
  const [evaluationData, setEvaluationData] = useState<any>();

  const {
    currentStageIndex,
    setCurrentStageIndex,
    currentStageData,
    stageData,
    currentStageType,
    gameIdentifier,
    feedbackArray,
    stageLength,
  } = useCurrentStageData(String(stageId));
  const levelProgress = useGetUserInfo((state) => state.allProgressLevels);

  //useMemos
  const levelKey = useMemo(() => `${lessonId}-${levelId}`, [lessonId, levelId]);

  const isRewardClaimed = useMemo(
    () =>
      levelProgress?.[String(category)]?.[levelKey]?.isRewardClaimed ?? false,
    [levelProgress, levelKey, category]
  );
  const islevelCompleted = useMemo(
    () => levelProgress?.[String(category)]?.[levelKey]?.isCompleted ?? false,
    [levelProgress, levelKey, category]
  );

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
    stageLength: stageLength,
    gameIdentifier: gameIdentifier,
    currentStageDataType: currentStageType,
    setCurrentStageIndex: setCurrentStageIndex,
    currentStageIndex: currentStageIndex,
    currentStageData: currentStageData,
  });

  const { handlePrevious, handleBackPress, handleNext } = useStageNavigation(
    setCurrentStageIndex,
    currentStageIndex,
    islevelCompleted,
    stageLength,
    finalAnswerModall.setVisibility,
    levelFinishedModal.setVisibility
  );
  const databaseQueryingFunctions = useCodeEditorDatabase();

  const isMutating = useIsMutating();

  const handleExpandTerminal = useCallback(() => {
    terminalRef.current?.expand();
  }, []);

  const {
    webRef,
    sendToWebView,
    receivedCode,
    setReceivedCode,
    setLogs,
    logs,
    terminalRef,
  } = useCodeEditor();
  const hintModall = useModal();
  const [hintLoading, setHintLoading] = useState<boolean>(false);
  const [generatedHint, setGeneratedHint] = useState<string>("");
  const activeBuffs = activeBuffsLocal((state) => state.activeBuff);
  const removeActiveBuff = activeBuffsLocal((state) => state.removeActiveBuff);
  const codeWhisperItem = codeWhisper(
    hintModall.setVisibility,
    setGeneratedHint,
    setHintLoading
  );

  console.log(category);
  useEffect(() => {
    const run = async () => {
      const useItem = async (itemName: string, useThisItem: any) => {
        useThisItem();
        removeActiveBuff(itemName);
      };
      if (activeBuffs.includes("revealHint")) {
        console.log(category + "!!!!!!!!!!!!!!");
        await useItem(
          "revealHint",
          await codeWhisperItem.mutateAsync({
            description: currentStageData.description,
            instruction: currentStageData?.instruction,
            receivedCode:
              category === "Database"
                ? databaseQueryingFunctions.queryRecievedCode.query ||
                  "Query is empty"
                : receivedCode,
          })
        );
      }
    };
    run();
  }, [activeBuffs, category]);
  return (
    <ProtectedRoutes>
      <View className="flex-1 bg-background p-3">
        {(isMutating > 0 || codeWhisperItem.isPending || hintLoading) && (
          <FillScreenLoading></FillScreenLoading>
        )}
        <CustomGeneralContainer>
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flex: 1,
            }}
            enableOnAndroid
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
          >
            <StageHeader
              handleBackPress={handleBackPress}
              handleExpandTerminal={handleExpandTerminal}
              category={String(category)}
              sendToWebView={sendToWebView}
            ></StageHeader>
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

            {/* Determines Code editor */}
            {hintModall.visibility && (
              <HintModal {...hintModall} hint={generatedHint}></HintModal>
            )}

            <RenderStageEditor
              category={String(category)}
              databaseQueryingFunctions={databaseQueryingFunctions}
              terminalRef={terminalRef}
              webRef={webRef}
              receivedCode={receivedCode!}
              setReceivedCode={setReceivedCode}
              setLogs={setLogs}
              logs={logs}
            ></RenderStageEditor>

            {/* TODO: Hides inventory on completed levels */}
            {!hintLoading && <ItemList></ItemList>}
          </KeyboardAwareScrollView>
          <SwipeLessonContainer>
            {/* Renders the heart system on gamemodes */}
            {currentStageData.type !== "Lesson" && <Hearts></Hearts>}

            {/* Renders the contents of the page */}
            <StageGameComponent
              currentStageData={currentStageData}
              type={currentStageData?.type}
              category={category}
              lessonId={lessonId}
              levelId={levelId}
              stageId={currentStageData?.id}
              setCurrentStageIndex={setCurrentStageIndex}
            ></StageGameComponent>

            <View className="flex-row justify-evenly mt-12">
              {/* Renders prev button on lesson only */}
              {(currentStageData?.type === "Lesson" || islevelCompleted) && (
                <Pressable onPress={handlePrevious}>
                  <Text className="px-7 py-2 bg-[#E63946] self-start  text-white rounded-3xl font-exoRegular text-xs xs:text-[10px]">
                    Prev
                  </Text>
                </Pressable>
              )}
              {/* TODO: Might consider rendering evaluate button upon level completion on all gamemodes */}
              {/* Evalutaion button on Lesson */}
              {currentStageData?.type === "Lesson" && (
                <Pressable
                  onPress={() => {
                    if (category === "Database") {
                      handleEvaluation(
                        databaseQueryingFunctions.queryRecievedCode.query
                      );
                      return;
                    }

                    handleEvaluation(receivedCode);
                  }}
                  className="mx-auto"
                >
                  <Text className="px-7 py-2 bg-button self-start rounded-3xl text-xs xs:text-[10px] font-exoRegular text-whte text-white">
                    Evaluate
                  </Text>
                </Pressable>
              )}
              {/* Renders Next button except on brain bytes as it has its own button. Renders Next button upon level completion */}
              {(currentStageData?.type !== "BrainBytes" ||
                islevelCompleted) && (
                <Pressable onPress={handleNext}>
                  <Text className="px-7 py-2 bg-[#2ECC71] text-white self-start rounded-3xl font-exoRegular text-xs xs:text-[10px]">
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
