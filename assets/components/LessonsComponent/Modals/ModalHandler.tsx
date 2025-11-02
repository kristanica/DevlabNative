import toastHandler from "@/assets/zustand/toastHandler";
import { useBrainBytesStore } from "@/assets/zustand/useBrainBytesStore";
import { router } from "expo-router";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { StyleSheet } from "react-native";
import EvaluateModal from "../../CodeEditor/EvaluateModal";
import FinalAnswerModal from "../FinalAnswerModal";
import GameOverModal from "../GameOverModal";
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

  queryRecievedCode: any;
  finalAnswerModall: any;
  isRewardClaimed: any;
  category: string;
  currentStageType: string;
  evaluationData: any;
  feedBackModal: any;

  //will show game over once user ran outof hp
  gameOverModal: any;
  setCurrentStageIndex: Dispatch<SetStateAction<number>>;
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
  gameOverModal,
  feedbackArray,
  setCurrentStageIndex,
}: ModalHandlerProps) => {
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);
  const userAnswer = useBrainBytesStore.getState().userAnswer;
  const correctAnswer = useBrainBytesStore.getState().correctAnswer;
  const setUserAnswer = useBrainBytesStore.getState().setUserAnswer;
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
      setUserAnswer("");

      return;
    }
    console.log("pressed!");
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
  //Back to main button on LevelfinishedModal
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
          feedbackArray={feedbackArray.current}
        ></FeedBackModal>
      )}

      {/* When level is finished, this will show */}
      {levelFinishedModal.visibility && (
        <LevelFinishedModal
          onConfirm={handleLevelFinished}
          {...levelFinishedModal}
          isRewardClaimed={isRewardClaimed}
          evaluationData={evaluationData}
          feedbackArray={feedbackArray.current}
        ></LevelFinishedModal>
      )}

      {gameOverModal.visibility && (
        <GameOverModal
          {...gameOverModal}
          onConfirm={() => {
            setCurrentStageIndex(0);
            gameOverModal.closeModal();
          }}
          category={category}
        ></GameOverModal>
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
