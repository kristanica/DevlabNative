import { create } from "zustand";

type Payload = {
  lessonId: string;
  nextLevelId: string;
};

type UnlockNextStageProps = {
  nextLevelPayload: Payload | null;
  nextLessonPayload: string | null;
  nextSubjectPayload: boolean;
  unlockNextLevel: (val: Payload) => void;
  unlockNextLesson: (val: string) => void;
  unlockNextSubject: (val: boolean) => void;
};

const unlockNextLevel = create<UnlockNextStageProps>((set) => ({
  nextLevelPayload: null,
  nextLessonPayload: null,
  nextSubjectPayload: false,
  unlockNextSubject: (val: boolean) => set({ nextSubjectPayload: val }),
  unlockNextLesson: (val: string) => set({ nextLessonPayload: val }),
  unlockNextLevel: (val: Payload) => set({ nextLevelPayload: val }),
}));

export default unlockNextLevel;
