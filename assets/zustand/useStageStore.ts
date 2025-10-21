import { create } from "zustand";
type StageCategoryData = {
  [key: string]: any[]; // Replace any[] with your actual stage item type later
};
type useStageStorePayload = {
  stageData: StageCategoryData;
  setStageData: (category: string, val: any[]) => void;
};

export const useStageStore = create<useStageStorePayload>((set) => ({
  stageData: {},
  setStageData: (category: string, val: any[]) =>
    set((state) => ({
      stageData: {
        ...state.stageData,
        [category]: val,
      },
    })),
}));
