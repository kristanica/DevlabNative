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
      console.log(stageId);
      nextStage.mutate({
        stageId: currentStageData.id,
        lessonId: String(lessonId),
        levelId: levelId,
        category: category,
        setCurrentStageIndex,
        levelFinishedModal,
        finalAnswerModall,
        stageType: currentStageData.type,
      });
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
              stageType: currentStageData.type,
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
//  try {
//       const res = await unlockNextStage({
//         category: category,
//         lessonId: lessonId,
//         levelId: levelId,
//         stageId: stageId,
//       });
//       const setUnlockNextLesson = unlockNextLevel.getState().unlockNextLesson;
//       const setUnlockNextSubject =
//         unlockNextLevel.getState().unlockNextSubject;
//       const setUnlockNextLevel = unlockNextLevel.getState().unlockNextLevel;
//       console.log(res);

//       if (res.isNextStageUnlocked) {
//         console.log("HELLO");
//         setCurrentStageIndex((prev: any) => prev + 1);
//         return;
//       } else if (res.isNextLevelUnlocked) {
//         finalAnswerModall.closeModal();

//         setTimeout(() => {
//           levelFinishedModal.setVisibility(true);
//         }, 200);
//         setUnlockNextLevel({
//           lessonId: lessonId,
//           nextLevelId: res.nextLevelId,
//         });
//         return;
//       } else if (res.isNextLessonUnlocked) {
//         finalAnswerModall.closeModal();
//         setTimeout(() => {
//           levelFinishedModal.setVisibility(true);
//         }, 200);
//         setUnlockNextLesson(res.nextLessonId);
//         return;
//       } else {
//         setTimeout(() => {
//           levelFinishedModal.setVisibility(true);
//         }, 200);
//         setUnlockNextSubject(res.isWholeTopicFinished);
//         return;
//       }
//     } catch (err) {
//       console.error("unlockNextStage error:", err);
//       levelFinishedModal.setVisibility(true);
//     }
