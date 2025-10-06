type ClaimAchievementsPayload = {
  achievementId: string;
  expReward: number;
  coinsReward: number;
};

type purhcaseItemPayload = {
  id: string;
  cost: number;
  itemName: string;
};

type submitAnswerPayload = {
  stageId: string;
  lessonId: string;
  levelId: string;
  category: string;
  answer?: boolean;
  setCurrentStageIndex: any;
  levelFinishedModal: any;
  finalAnswerModall: any;
  stageType: string;
};
