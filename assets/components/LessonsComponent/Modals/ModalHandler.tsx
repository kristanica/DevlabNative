import toastHandler from "@/assets/zustand/toastHandler";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import EvaluateModal from "../../CodeEditor/EvaluateModal";
import FillScreenLoading from "../../global/FillScreenLoading";
import FinalAnswerModal from "../FinalAnswerModal";
import LevelFinishedModal from "../LevelFinishedModal";
import FeedBackModal from "./FeedBackModal";

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
  const handleFinalAnswerModal = useCallback(async () => {
    finalAnswerModall.closeModal();
    console.log(currentStageType + "modalHandler");
    if (category === "Database") {
      console.log(queryRecievedCode.query + "modalHandler");
      const toastResult = await handleFinalAnswer(
        queryRecievedCode,
        currentStageType
      );
      setToastVisibility(toastResult[0], toastResult[1]);
      return;
    }
    const toastResult = await handleFinalAnswer(
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
    router.push({
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
      {feedBackModal.visibility && (
        <FeedBackModal
          {...feedBackModal}
          evaluationData={evaluationData}
        ></FeedBackModal>
      )}
      {evaluationLessonMutation.isPending && (
        <FillScreenLoading></FillScreenLoading>
      )}
      {levelFinishedModal.visibility && (
        <LevelFinishedModal
          onConfirm={handleLevelFinished}
          {...levelFinishedModal}
          isRewardClaimed={isRewardClaimed}
          evaluationData={evaluationData}
        ></LevelFinishedModal>
      )}
      {}
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
