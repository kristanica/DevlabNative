import toastHandler from "@/assets/zustand/toastHandler";
import { useBrainBytesStore } from "@/assets/zustand/useBrainBytesStore";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import EvaluateModal from "../../CodeEditor/EvaluateModal";
import FinalAnswerModal from "../FinalAnswerModal";
import LevelFinishedModal from "../LevelFinishedModal";
import FeedBackModal from "./FeedBackModal";
// TODO: FIXED THESE, PLEASE
type ModalHandlerProps = {
  lessonId: string;
  feedbackArray: any;
  setEvaluationData: any;
  levelFinishedModal: any;
  evaluateModal: any;
  evaluationLessonMutation: any;
  handleFinalAnswer: any;
  receivedCode: any;
  stageData: any;
  queryRecievedCode: any;
  finalAnswerModall: any;
  isRewardClaimed: any;
  category: string;
  currentStageType: string;
  evaluationData: any;
  feedBackModal: any;
};

const ModalHandler = ({
  feedBackModal,
  isRewardClaimed,
  levelFinishedModal,
  evaluateModal,
  evaluationLessonMutation,
  handleFinalAnswer,
  receivedCode,
  queryRecievedCode,
  finalAnswerModall,
  currentStageType,
  setEvaluationData,
  evaluationData,
  category,
  feedbackArray,
}: ModalHandlerProps) => {
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);
  const userAnswer = useBrainBytesStore.getState().userAnswer;
  const correctAnswer = useBrainBytesStore.getState().correctAnswer;
  const handleFinalAnswerModal = useCallback(async () => {
    let toastResult;
    finalAnswerModall.closeModal();
    if (userAnswer) {
      console.log(userAnswer + " UserAnswer?");
      console.log(correctAnswer + " correctnAnwer");
      toastResult = await handleFinalAnswer(
        null,
        currentStageType,
        setEvaluationData,
        feedbackArray,
        userAnswer,
        correctAnswer
      );
      return;
    }
    if (category === "Database") {
      console.log(queryRecievedCode);
      console.log(queryRecievedCode.query + "modalHandler");
      const recievedCode = queryRecievedCode.query;
      toastResult = await handleFinalAnswer(
        recievedCode,
        currentStageType,
        setEvaluationData,
        feedbackArray
      );
      setToastVisibility(toastResult[0], toastResult[1]);
      return;
    }
    toastResult = await handleFinalAnswer(
      receivedCode,
      currentStageType,
      setEvaluationData,
      feedbackArray
    );
    setToastVisibility(toastResult[0], toastResult[1]);
  }, [
    finalAnswerModall,
    receivedCode,
    currentStageType,
    setEvaluationData,
    feedbackArray,
    category,
    setToastVisibility,
  ]);
  const handleLevelFinished = useCallback(async () => {
    router.replace({
      pathname: "/home/category/[categoryId]",
      params: {
        categoryId: category,
      },
    });
    levelFinishedModal.closeModal();
  }, [category, levelFinishedModal]);
  const handleEvaluate = useCallback(() => {
    evaluateModal.closeModal();
  }, [evaluateModal]);
  return (
    <>
      {/* Currently not in used */}
      {feedBackModal.visibility && (
        <FeedBackModal
          {...feedBackModal}
          evaluationData={evaluationData}
        ></FeedBackModal>
      )}

      {/* When level is finished, this will show */}
      {levelFinishedModal.visibility && (
        <LevelFinishedModal
          onConfirm={handleLevelFinished}
          {...levelFinishedModal}
          isRewardClaimed={isRewardClaimed}
          evaluationData={evaluationData}
        ></LevelFinishedModal>
      )}

      {/* Once the evaluate button is pressedm this willshow */}
      {evaluateModal.visibility && (
        <EvaluateModal
          onConfirm={handleEvaluate}
          gptResponse={evaluationLessonMutation.data}
          {...evaluateModal}
        ></EvaluateModal>
      )}

      {/* Shows answer confirmation before navigating to the next one */}
      {finalAnswerModall.visibility && (
        <FinalAnswerModal
          onConfirm={handleFinalAnswerModal}
          {...finalAnswerModall}
        />
      )}
    </>
  );
};

export default ModalHandler;

const styles = StyleSheet.create({});
