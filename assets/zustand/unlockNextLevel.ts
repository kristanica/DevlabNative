import { create } from "zustand";

type Payload = {
  lessonId: string;
  nextLevelId: string;
};

type UnlockNextStageProps = {
  nextLevelPayload: Payload | null;
  nextLessonPayload: string | null;
  unlockNextLevel: (val: Payload) => void;
  unlockNextLesson: (val: string) => void;
};

const unlockNextLevel = create<UnlockNextStageProps>((set) => ({
  nextLevelPayload: null,
  nextLessonPayload: null,
  unlockNextLesson: (val: string) => set({ nextLessonPayload: val }),
  unlockNextLevel: (val: Payload) => set({ nextLevelPayload: val }),
}));

export default unlockNextLevel;
