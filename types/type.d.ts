type ClaimAchievementsPayload = {
  achievementId: string;
  expReward: number;
  coinsReward: number;
};
type purchaseItemPayload = {
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

type ingameItemsPayload = {
  id: string;
  Icon: string;
  cost: number;
  desc: string;
  title: string;
};

type generalTrackerPayload = {
  category: string;
  lessonId: string;
  levelId: string;
  stageId: string;
};

type ScaleModalProps = {
  visibility: boolean;
  scaleStyle: AnimatedStyle<ViewStyle>;
  closeModal: () => void;
  onConfirm?: () => void;
};
