import toastHandler from "@/assets/zustand/toastHandler";
import { router } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import EvaluateModal from "../../CodeEditor/EvaluateModal";
import FillScreenLoading from "../../global/FillScreenLoading";
import FinalAnswerModal from "../FinalAnswerModal";
import LevelFinishedModal from "../LevelFinishedModal";

type ModalHandlerProps = {
  lessonId: string;

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
};

const ModalHandler = ({
  isRewardClaimed,
  levelFinishedModal,
  evaluateModal,
  evaluationLessonMutation,
  handleFinalAnswer,
  receivedCode,
  queryRecievedCode,
  finalAnswerModall,
  currentStageType,

  category,
}: ModalHandlerProps) => {
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);
  return (
    <>
      {evaluationLessonMutation.isPending && (
        <FillScreenLoading></FillScreenLoading>
      )}
      {levelFinishedModal.visibility && (
        <LevelFinishedModal
          onConfirm={async () => {
            router.push({
              pathname: "/home/category/[categoryId]",
              params: {
                categoryId: category,
              },
            });
          }}
          {...levelFinishedModal}
          isRewardClaimed={isRewardClaimed}
        ></LevelFinishedModal>
      )}

      {evaluateModal.visibility && (
        <EvaluateModal
          onConfirm={() => evaluateModal.closeModal()}
          gptResponse={evaluationLessonMutation.data}
          {...evaluateModal}
        ></EvaluateModal>
      )}

      {/* Shows answer confirmation before navigating to the next one */}
      {finalAnswerModall.visibility && (
        <FinalAnswerModal
          onConfirm={async () => {
            finalAnswerModall.closeModal();
            console.log(currentStageType + "modalHandler");

            if (category === "Database") {
              console.log(queryRecievedCode.query + "modalHandler");
              const toastResult = await handleFinalAnswer(
                queryRecievedCode.result
              );

              setToastVisibility(toastResult[0], toastResult[1]);

              return;
            }
            const toastResult = await handleFinalAnswer(
              receivedCode,
              currentStageType
            );

            // await playSound(toastResult[0]);

            setToastVisibility(toastResult[0], toastResult[1]);
          }}
          {...finalAnswerModall}
        />
      )}
    </>
  );
};

export default ModalHandler;

const styles = StyleSheet.create({});
