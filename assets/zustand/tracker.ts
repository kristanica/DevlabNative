import { create } from "zustand";

type identifier = {
  category: string;
  lessonId: string;
  levelId: string;
};

type trackerPayload = {
  levelPayload: identifier | null;
  stageId: string | null;
  setTracker: (val: identifier) => void;
  setStage: (val: string) => void;
};

const tracker = create<trackerPayload>((set) => ({
  levelPayload: null,
  stageId: null,
  setTracker: (val: identifier) => set({ levelPayload: val }),
  setStage: (val: string) => set({ stageId: val }),
}));
export default tracker;
