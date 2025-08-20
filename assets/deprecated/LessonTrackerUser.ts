import { create } from "zustand";

type identifier = {
  lessonId: string;
  levelId: string;
};

type LessonTrackerUserPayload = {
  category: string | null;
  setCategory: (val: string) => void;
  stageId: string | null;
  setStageId: (val: string) => void;
  setLevelIdentifer: (val: identifier) => void;
  levelIdentifier: identifier | null;
};

const LessonTrackerUser = create<LessonTrackerUserPayload>((set) => ({
  category: null,
  setCategory: (val: string) => set({ category: val }),
  stageId: null,
  setStageId: (val: string) => set({ stageId: val }),
  levelIdentifier: null,
  setLevelIdentifer: (val: identifier) => set({ levelIdentifier: val }),
}));

export default LessonTrackerUser;
