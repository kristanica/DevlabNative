import unlockNextStage from "@/assets/API/fireBase/user/unlockNextStage";
import unlockNextLevel from "@/assets/zustand/unlockNextLevel";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { RefObject } from "react";
import useEvaluationGame from "../query/mutation/useEvaluationGame";
import useEvaluationLesson from "../query/mutation/useEvaluationLesson";
import useModal from "../useModal";
import useSubmitAnswer from "./useSubmitAnswer";

type useHandleFinalAnswerProps = {
  lessonId: string;
  levelId: string;
  stageId: string;
  category: string;
  gameIdentifier: RefObject<string | undefined>;
  currentStageDataType: string;
  setCurrentStageIndex: React.Dispatch<React.SetStateAction<number>>;
  currentStageIndex: number;
  currentStageData: any;
};

export const useHandleFinalAnswer = ({
  lessonId,
  levelId,
  stageId,
  category,
  gameIdentifier,
  currentStageDataType,
  setCurrentStageIndex,
  currentStageIndex,
  currentStageData,
}: useHandleFinalAnswerProps) => {
  const { evaluationMutation } = useEvaluationGame();

  const { nextStage } = useSubmitAnswer();
  const finalAnswerModall = useModal();
  const evaluateModal = useModal();
  const levelFinishedModal = useModal();
  const allStages = useGetUserInfo.getState().allProgressStages;
  const { evaluationLessonMutation } = useEvaluationLesson();

  //Handles evaluation for lessons only
  const handleEvaluation = (receivedCode: any) => {
    if (!receivedCode) {
      return;
    }
    evaluationLessonMutation.mutate(
      {
        receivedCode: receivedCode,
        instruction: currentStageData.instruction,
        description: currentStageData.description,
      },
      {
        onSuccess: () => {
          evaluateModal.setVisibility(true);
        },
      }
    );
  };

  const handleFinalAnswer = async (
    receivedCode: any,
    resetStageId: string,

    showToast: (type: string) => void,
    stageDataLength: number
  ) => {
    const stageKey = `${lessonId}-${levelId}-${stageId}`;
    const isStageLocked =
      allStages?.[String(category)]?.[stageKey]?.status ?? false;
    gameIdentifier.current = currentStageDataType;
    // Checks if the next stage is already unlocked

    // if (isStageLocked) {
    //   if (stageDataLength - 1 === currentStageIndex) {
    //     finalAnswerModall.closeModal();
    //     setTimeout(() => levelFinishedModal.setVisibility(true), 200);
    //     return;
    //   }
    //   finalAnswerModall.closeModal();
    //   setCurrentStageIndex((prev: any) => prev + 1);
    //   return;
    // }
    // Chekcs if the current stage is Lesson, this will ignore answer
    if (currentStageDataType === "Lesson") {
      try {
        const res = await unlockNextStage({
          category,
          lessonId,
          levelId,
          stageId,
        });

        const setUnlockNextLevel = unlockNextLevel.getState().unlockNextLevel;
        console.log(res);
        if (res?.nextStageId) {
          console.log("Youve unlocked next stage!");

          setCurrentStageIndex((prev) => prev + 1);
          return;
        } else {
          levelFinishedModal.setVisibility(true);
          setUnlockNextLevel({
            lessonId: lessonId,
            nextLevelId: res.nextLevelId,
          });
        }
        return;
      } catch (err) {
        console.error("unlockNextStage error:", err);
        levelFinishedModal.setVisibility(true);
      }
    }

    if (!receivedCode && currentStageDataType !== "Lesson") {
      showToast("error");
      finalAnswerModall.closeModal();
      return;
    } else {
      evaluationMutation.mutate(
        {
          receivedCode: receivedCode,
          instruction: currentStageData.instruction,
          description: currentStageData.description,
        },
        {
          onSuccess: (data) => {
            const toastResult = data.correct ? "success" : "error";
            showToast(toastResult);

            nextStage.mutate({
              stageId: currentStageData.id,
              lessonId: String(lessonId),
              levelId: levelId,
              category: category,
              answer: data.correct,
              setCurrentStageIndex,
              levelFinishedModal,
              finalAnswerModall,
            });
          },
        }
      );
    }
  };

  return {
    handleFinalAnswer,
    handleEvaluation,
    evaluationLessonMutation,
    finalAnswerModall,
    evaluateModal,
    levelFinishedModal,
  };
};
