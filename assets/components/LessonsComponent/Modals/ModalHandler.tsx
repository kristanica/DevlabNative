import unlockNextLevel from "@/assets/zustand/unlockNextLevel";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { router } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import EvaluateModal from "../../CodeEditor/EvaluateModal";
import FillScreenLoading from "../../global/FillScreenLoading";
import FinalAnswerModal from "../FinalAnswerModal";
import GameOverModal from "../GameOverModal";
import LevelFinishedModal from "../LevelFinishedModal";

type ModalHandlerProps = {
  lessonId: string;

  gameOver: any;
  levelFinishedModal: any;
  evaluateModal: any;
  evaluationLessonMutation: any;
  handleFinalAnswer: any;
  receivedCode: any;
  stageData: any;
  showToast: any;
  handleGameOver: any;
  finalAnswerModall: any;
  health: any;
  category: string;
};

const ModalHandler = ({
  gameOver,
  levelFinishedModal,
  evaluateModal,
  evaluationLessonMutation,
  handleFinalAnswer,
  receivedCode,
  stageData,
  showToast,
  handleGameOver,
  finalAnswerModall,
  health,
  category,
}: ModalHandlerProps) => {
  return (
    <>
      {health === 0 && gameOver.visibility && (
        <GameOverModal
          onConfirm={() => {
            handleGameOver();
          }}
          {...gameOver}
        ></GameOverModal>
      )}
      {evaluationLessonMutation.isPending && (
        <FillScreenLoading></FillScreenLoading>
      )}
      {levelFinishedModal.visibility && (
        <LevelFinishedModal
          onConfirm={() => {
            const nextLevelPayload =
              unlockNextLevel.getState().nextLevelPayload;
            const nextLessonPayload =
              unlockNextLevel.getState().nextLessonPayload;
            const { allProgressLevels, completedLevels, allProgressStages } =
              useGetUserInfo.getState();
            if (!nextLevelPayload) {
              router.push({
                pathname: "/home/category/[categoryId]",
                params: {
                  categoryId: category,
                },
              });
              return;
            }

            if (nextLevelPayload && !nextLessonPayload) {
              useGetUserInfo.getState().setUserProgress({
                allProgressLevels: {
                  ...allProgressLevels,
                  [category]: {
                    ...allProgressLevels[category],
                    [`${nextLevelPayload!.lessonId}-${
                      nextLevelPayload!.nextLevelId
                    }`]: {
                      status: true,
                      rewardClaimed: false,
                    },
                  },
                },
                allProgressStages: {
                  ...allProgressStages,
                  [category]: {
                    ...allProgressStages[category],
                    [`${nextLevelPayload?.lessonId}-${nextLevelPayload?.nextLevelId}-Stage1`]:
                      {
                        status: true,
                      },
                  },
                },
                completedLevels: completedLevels + 1,
                completedStages: useGetUserInfo.getState().completedStages,
              });
            }
            if (nextLevelPayload && nextLessonPayload) {
              console.log("continue", nextLessonPayload);
              useGetUserInfo.getState().setUserProgress({
                allProgressLevels: {
                  ...allProgressLevels,
                  [category]: {
                    ...allProgressLevels[category],
                    [`${nextLessonPayload}-Level1`]: {
                      status: true,
                      rewardClaimed: true,
                    },
                  },
                },
                allProgressStages: {
                  ...allProgressStages,
                  [category]: {
                    ...allProgressStages[category],
                    [`${nextLessonPayload}-Level1-Stage1`]: {
                      status: true,
                    },
                  },
                },
                completedLevels: completedLevels + 1,
                completedStages: useGetUserInfo.getState().completedStages,
              });
            }
            router.push({
              pathname: "/home/category/[categoryId]",
              params: {
                categoryId: category,
              },
            });
          }}
          {...levelFinishedModal}
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
          onConfirm={() => {
            finalAnswerModall.closeModal();
            handleFinalAnswer(
              receivedCode,
              stageData[0].id,
              showToast,
              stageData.length
            );
          }}
          {...finalAnswerModall}
        />
      )}
    </>
  );
};

export default ModalHandler;

const styles = StyleSheet.create({});
