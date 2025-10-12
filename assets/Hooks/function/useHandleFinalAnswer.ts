import { unlockedStages } from "@/assets/zustand/unlockedStages";
import { RefObject } from "react";
import { apiCall } from "../query/mutation/apiCall";
import useEvaluationLesson from "../query/mutation/useEvaluationLesson";
import useModal from "../useModal";
import { playSound } from "./soundHandler";
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
  const evaluateGame = apiCall();

  const { nextStage } = useSubmitAnswer();
  const finalAnswerModall = useModal();
  const evaluateModal = useModal();
  const levelFinishedModal = useModal();
  // const allStages = useGetUserInfo.getState().allProgressStages;
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
        onSuccess: async () => {
          evaluateModal.setVisibility(true);
          await playSound("success");
        },
      }
    );
  };

  const handleFinalAnswer = async (receivedCode: any) => {
    const finishedStages = unlockedStages.getState().unlockedStages;

    const isStagedUnlocked =
      finishedStages[`${lessonId}-${levelId}-${currentStageData.id}`]
        .isCompleted ?? false;

    if (isStagedUnlocked) {
      console.log(
        `${lessonId}-${levelId}-${currentStageData.id} is ${isStagedUnlocked}`
      );
      setCurrentStageIndex((prev) => prev + 1);
      return;
    }
    // const isStageLocked =
    //   allStages?.[String(category)]?.[stageKey]?.status ?? false;
    // gameIdentifier.current = currentStageDataType;
    // Checks if the next stage is already unlocked

    // if (isStageLocked) {

    //   finalAnswerModall.closeModal();
    //   setCurrentStageIndex((prev: any) => prev + 1);
    //   return;
    // }
    // Chekcs if the current stage is Lesson, this will ignore answer

    return new Promise(async (resolve, reject) => {
      if (currentStageDataType === "Lesson") {
        const evaluationResult = nextStage.mutateAsync({
          stageId: currentStageData.id,
          lessonId: String(lessonId),
          levelId: levelId,
          category: category,
          setCurrentStageIndex,
          levelFinishedModal,
          finalAnswerModall,
          stageType: currentStageData.type,
        });
        resolve(evaluationResult);
        return;
      }

      if (!receivedCode && currentStageDataType !== "Lesson") {
        setTimeout(() => finalAnswerModall.closeModal(), 100);
        resolve(["wrongAnswer", "Your code field is empty!"]);
        return;
      } else {
        const stringReceivedCode = JSON.stringify(receivedCode);
        evaluateGame.mutate(
          {
            submittedCode: stringReceivedCode,
            instruction: currentStageData.instruction,
            providedCode: currentStageData?.replicationFile,
            description: currentStageData?.description,
            subject: category,
            gameType: currentStageData?.type,
          },
          {
            onSuccess: async (data) => {
              setTimeout(() => finalAnswerModall.closeModal(), 100);
              const evaluationResult = await nextStage.mutateAsync({
                stageId: currentStageData.id,
                lessonId: String(lessonId),
                levelId: levelId,
                category: category,
                answer: data.correct,
                setCurrentStageIndex,
                levelFinishedModal,
                finalAnswerModall,
                stageType: currentStageData.type,
              });
              console.log(evaluationResult);
              resolve(evaluationResult);
            },

            onError: (data) => {
              console.log(data);
            },
          }
        );
      }
    });
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
