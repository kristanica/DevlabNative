import { RefObject } from "react";
import { apiCall } from "../query/mutation/apiCall";
import { makeLevelFeedback } from "../query/mutation/makeLevelFeedback";
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

  category,

  setCurrentStageIndex,

  currentStageData,
}: useHandleFinalAnswerProps) => {
  const evaluateGame = apiCall();

  const { nextStage } = useSubmitAnswer(setCurrentStageIndex);

  const finalAnswerModall = useModal();
  const evaluateModal = useModal();
  const levelFinishedModal = useModal();
  const feedBackModal = useModal();
  const makeFeedback = makeLevelFeedback();

  const { evaluationLessonMutation } = useEvaluationLesson();

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

  const handleFinalAnswer = async (
    receivedCode: any,
    type: string,
    setEvaluationData: any,
    feedbackArray: any
  ) => {
    // const   = unlockedStages.getState().unlockedStages;

    // const isStagedUnlocked =
    //   finishedStages[`${lessonId}-${levelId}-${currentStageData.id}`]
    //     .isCompleted ?? false;

    // if (isStagedUnlocked) {
    //   console.log(
    //     `${lessonId}-${levelId}-${currentStageData.id} is ${isStagedUnlocked}`
    //   );
    //   setCurrentStageIndex((prev) => prev + 1);
    //   return;
    // }

    console.log(type + " hAndleFinalAnswer");
    return new Promise(async (resolve, reject) => {
      if (type === "Lesson") {
        console.log("OKEASE?");
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

      if (!receivedCode && type !== "Lesson") {
        setTimeout(() => finalAnswerModall.closeModal(), 100);
        resolve(["wrongAnswer", "Your code field is empty!"]);
        return;
      } else {
        const stringReceivedCode = JSON.stringify(receivedCode);
        evaluateGame.mutate(
          {
            submittedCode: stringReceivedCode,
            instruction: currentStageData.instruction,
            providedCode:
              type === "CodeCrafter"
                ? currentStageData?.replicationFile
                : currentStageData?.codingInterface,
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
                evaluationResult: data,
              });

              if (
                data.correct &&
                currentStageData.type !== "Lesson" &&
                currentStageData.type !== "BrainBytes"
              ) {
                feedbackArray.current.push({
                  stageId: currentStageData.id,
                  evaluation: data.feedback,
                  feedback: data.evaluation,
                });
                console.log(feedbackArray);
              }

              if (evaluationResult![0] === "levelUnlocked") {
                setEvaluationData(
                  await makeFeedback.mutateAsync(feedbackArray.current)
                );
              }
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
    feedBackModal,
  };
};
