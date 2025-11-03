import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import FillScreenLoading from "@/assets/components/global/FillScreenLoading";
import StageDataReadyLoading from "@/assets/components/global/StageDataReadyLoading";
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
import { sampleStageData } from "@/assets/Hooks/stageScreenHandles/sampleStageData";
import { useStageNavigation } from "@/assets/Hooks/stageScreenHandles/useStageNavigation";
import { db } from "@/constants";

import useCodeEditor from "@/assets/Hooks/useCodeEditor";
import { useCodeEditorDatabase } from "@/assets/Hooks/useCodeEditorDatabase";
import useModal from "@/assets/Hooks/useModal";
import { unlockedStages } from "@/assets/zustand/unlockedStages";

import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { useIsMutating, useMutation } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// RENDERS THE **MAIN** SCREEN
const StageScreen = () => {
  // Gets the variables from the URL
  const { stageId, lessonId, levelId, category } = useLocalSearchParams();

  const [evaluationData, setEvaluationData] = useState<any>();

  const {
    currentStageIndex,
    setCurrentStageIndex,
    currentStageData,
    currentStageType,
    gameIdentifier,
    feedbackArray,
    stageLength,
  } = sampleStageData(
    String(category),
    String(lessonId),
    String(levelId),
    String(stageId)
  );
  const levelProgress = useGetUserInfo((state) => state.allProgressLevels);
  const lastOpenedStage = useGetUserInfo((state) => state.userData);
  const unlockStage = unlockedStages((state) => state.unlockedStages);
  //useMemos
  const levelKey = useMemo(() => `${lessonId}-${levelId}`, [lessonId, levelId]);
  const stageKey = useMemo(() => {
    if (!currentStageData) return null;
    return `${lessonId}-${levelId}-${currentStageData.id}`;
  }, [lessonId, levelId, currentStageData]);
  const isStageAlreadyCompleted = useMemo(() => {
    if (!stageKey) return false;
    return Boolean(unlockStage[stageKey]);
  }, [stageKey, unlockStage]);

  //checks whether the user  has claimed the reward for the level
  const isRewardClaimed = useMemo(
    () =>
      levelProgress?.[String(category)]?.[levelKey]?.isRewardClaimed ?? false,
    [levelProgress, levelKey, category]
  );
  //checks whether the user has completed the level
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
    gameOverModal,
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
    levelFinishedModal.setVisibility,
    isStageAlreadyCompleted
    // stageKey
  );
  // Necessary variables for database
  const databaseQueryingFunctions = useCodeEditorDatabase();
  // Necessary variables for code editor

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
  const isMutating = useIsMutating({
    predicate: (mutation) => {
      return mutation.options.mutationKey?.[0] !== "lastOpenedStage";
    },
  });
  //NOTE: will skip the loading screen when unlockg next stage. Still unstable
  // const ignore: string[] = ["lastOpenedStage", "unlockNext", "submitAnswer"];
  // const hintModall = useModal();
  // const isMutating = useIsMutating({
  //   predicate: (mutation) => {
  //     const key = mutation.options.mutationKey?.[0];
  //     console.log(key + "WOAHHHH");
  //     if (ignore.includes(String(key))) {
  //       return false;
  //     }

  //     return true;
  //   },
  // });

  // Show/hide terminal
  const handleExpandTerminal = useCallback(() => {
    terminalRef.current?.expand();
  }, []);

  // const { content, getLessonData, getLevelData, dataCurrentStage } =
  //   sampleStageData(String(category), String(lessonId), String(levelId));
  // console.log(dataCurrentStage[currentStageIndex]);
  // const queryClient = useQueryClient();
  // const content =
  //   queryClient.getQueryData<any[]>(["getAllData", String(category)]) ?? [];
  // console.log(content);
  // const lesson = content.find((lesson: any) => lesson.id === lessonId);
  // const temp = lesson.levels.find((level: any) => level.id === levelId);
  // console.log(temp.stages);

  // CODE WHISPER
  // Sets the loading/hint once codewhisper is used
  const [hintLoading, setHintLoading] = useState<boolean>(false);
  const [generatedHint, setGeneratedHint] = useState<string>("");

  //local state zustand
  const activeBuffs = activeBuffsLocal((state) => state.activeBuff);
  const removeActiveBuff = activeBuffsLocal((state) => state.removeActiveBuff);

  // Actual logic for code whisper
  const codeWhisperItem = codeWhisper(
    hintModall.setVisibility,
    setGeneratedHint,
    setHintLoading
  );

  useEffect(() => {
    const run = async () => {
      const useItem = async (itemName: string, useThisItem: any) => {
        useThisItem();
        removeActiveBuff(itemName);
      };
      // Checks whether revealHint is used
      if (activeBuffs.includes("revealHint")) {
        await useItem(
          "revealHint",
          // Sends the necessary data on the mutation
          await codeWhisperItem.mutateAsync({
            description: currentStageData.description,
            instruction: currentStageData?.instruction,
            submittedCode:
              category === "Database"
                ? databaseQueryingFunctions.queryRecievedCode.query ||
                  "Query is empty"
                : receivedCode,
            receivedCode: currentStageData?.codingInterface || {},
            // Switch
          })
        );
      }
    };
    run();
  }, [activeBuffs, category]);
  // CODE WHISPER END

  //Sets the last opened stage on firebase
  const lastStageOpened = useMutation({
    mutationKey: ["lastOpenedStage"],
    mutationFn: async ({
      lesson,
      level,
      subject,
      stage,
      title,
      description,
      gameMode,
    }: {
      lesson: string;
      level: string;
      subject: string;
      stage: string;
      title: string;
      description: string;
      gameMode: string;
    }) => {
      const userRef = doc(db, "Users", String(lastOpenedStage?.id));

      //Updates the category of the lastOpenedLevel
      await updateDoc(userRef, {
        [`lastOpenedLevel.${subject}`]: {
          subject: subject,
          lessonId: lesson,
          levelId: level,
          stageId: stage,
          title: title,
          description: description,
          gameMode: gameMode,
        },
      });
    },
  });

  useEffect(() => {
    // Add comprehensive null checking
    if (!currentStageData || !currentStageData.id) {
      console.log("Waiting for stage data to load...");
      return;
    }

    if (!lessonId || !levelId || !category) {
      console.log("Missing route params");
      return;
    }

    lastStageOpened.mutate({
      lesson: String(lessonId),
      level: String(levelId),
      subject: String(category),
      stage: currentStageData.id,
      title: currentStageData.title,
      description: currentStageData.description,
      gameMode: currentStageData?.type,
    });
  }, [lessonId, levelId, currentStageData, category]);
  const isStageDataReady = !!currentStageData;

  // FIXME: This will clear all active buffs when user navgiates to a screen.
  // const clearActiveBuffs = activeBuffsLocal((state) => state.clearActiveBuff);
  // const activeBuff = activeBuffsLocal((state) => state.activeBuff);
  // useEffect(() => {
  //   clearActiveBuffs();
  //   console.log("cleared active buff!");
  //   console.log(activeBuff);
  // }, [lessonId, levelId, stageId, category]);

  const [isSwipeShown, setIsSwipeShown] = useState<boolean>(true);

  const handleToggleSwipe = () => setIsSwipeShown((prev) => !prev);

  return (
    <ProtectedRoutes>
      <View className="flex-1 bg-background p-3">
        {!isStageDataReady ? (
          <StageDataReadyLoading></StageDataReadyLoading>
        ) : (
          <>
            {(isMutating > 0 || codeWhisperItem.isPending || hintLoading) && (
              <FillScreenLoading />
            )}
            <CustomGeneralContainer>
              {isSwipeShown ? null : (
                <TouchableOpacity
                  className="z-10 absolute bottom-36 right-8 "
                  onPress={handleToggleSwipe}
                >
                  <Text className="text-white font-exoBold bg-button h-[40px] rounded-lg w-[90px] text-center ">
                    TOGGLE PANEL
                  </Text>
                </TouchableOpacity>
              )}

              <KeyboardAwareScrollView
                contentContainerStyle={{ flex: 1 }}
                enableOnAndroid
                extraScrollHeight={20}
                keyboardShouldPersistTaps="handled"
              >
                <StageHeader
                  handleBackPress={handleBackPress}
                  handleExpandTerminal={handleExpandTerminal}
                  category={String(category)}
                  sendToWebView={sendToWebView}
                />
                <ModalHandler
                  setCurrentStageIndex={setCurrentStageIndex}
                  gameOverModal={gameOverModal}
                  feedbackArray={feedbackArray}
                  feedBackModal={feedBackModal}
                  setEvaluationData={setEvaluationData}
                  evaluationData={evaluationData}
                  currentStageType={currentStageType}
                  isRewardClaimed={isRewardClaimed}
                  queryRecievedCode={
                    databaseQueryingFunctions.queryRecievedCode
                  }
                  lessonId={String(lessonId)}
                  levelFinishedModal={levelFinishedModal}
                  evaluateModal={evaluateModal}
                  finalAnswerModall={finalAnswerModall}
                  evaluationLessonMutation={evaluationLessonMutation}
                  handleFinalAnswer={handleFinalAnswer}
                  receivedCode={receivedCode}
                  category={String(category)}
                />
                {hintModall.visibility && (
                  <HintModal {...hintModall} hint={generatedHint} />
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
                />

                {!hintLoading &&
                  currentStageData?.type !== "Lesson" &&
                  !islevelCompleted && <ItemList category={String(category)} />}
              </KeyboardAwareScrollView>

              <SwipeLessonContainer
                gameType={currentStageData.type}
                isShown={isSwipeShown}
                onToggle={handleToggleSwipe}
              >
                {currentStageData.type !== "Lesson" && <Hearts />}
                <StageGameComponent
                  levelFinishedModal={levelFinishedModal}
                  finalAnswerModal={finalAnswerModall}
                  currentStageData={currentStageData}
                  type={currentStageData?.type}
                  category={category}
                  lessonId={lessonId}
                  levelId={levelId}
                  stageId={currentStageData?.id}
                  setCurrentStageIndex={setCurrentStageIndex}
                  isStageAlreadyCompleted={isStageAlreadyCompleted}
                />
                <View className="flex-row justify-evenly mt-12">
                  {(currentStageData?.type === "Lesson" ||
                    islevelCompleted) && (
                    <Pressable onPress={handlePrevious}>
                      <Text className="px-7 py-2 bg-[#E63946] self-start text-white rounded-3xl font-exoRegular text-xs xs:text-[10px]">
                        Prev
                      </Text>
                    </Pressable>
                  )}
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
                      <Text className="px-7 py-2 bg-button self-start rounded-3xl text-xs xs:text-[10px] font-exoRegular text-white">
                        Evaluate
                      </Text>
                    </Pressable>
                  )}

                  {(currentStageData?.type !== "BrainBytes" ||
                    isStageAlreadyCompleted) && (
                    <Pressable onPress={handleNext}>
                      <Text className="px-7 py-2 bg-[#2ECC71] text-white self-start rounded-3xl font-exoRegular text-xs xs:text-[10px]">
                        Next
                      </Text>
                    </Pressable>
                  )}
                </View>
              </SwipeLessonContainer>
            </CustomGeneralContainer>
          </>
        )}
      </View>
    </ProtectedRoutes>
  );
};

export default StageScreen;
