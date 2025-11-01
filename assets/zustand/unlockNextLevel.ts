import { create } from "zustand";

type Payload = {
  category: string;
  stageId: string;
  lessonId: string;
  prevLevelId: string;
  nextLevelId: string;
};

type UnlockNextStageProps = {
  nextLevelPayload: Payload | null;
  nextLessonPayload: Payload | null;
  nextSubjectPayload: boolean;
  unlockNextLevel: (val: Payload) => void;
  unlockNextLesson: (val: Payload) => void;
  unlockNextSubject: (val: boolean) => void;
  finishedTopics: Record<string, boolean>;
  markTopicFinished: (category: string) => void;
};

const unlockNextLevel = create<UnlockNextStageProps>((set) => ({
  nextLevelPayload: null,
  nextLessonPayload: null,
  nextSubjectPayload: false,
  finishedTopics: {},
  unlockNextSubject: (val: boolean) => set({ nextSubjectPayload: val }),
  unlockNextLesson: (val: Payload) => set({ nextLessonPayload: val }),
  unlockNextLevel: (val: Payload) => set({ nextLevelPayload: val }),

  markTopicFinished: (category: string) =>
    set((state) => ({
      finishedTopics: {
        ...state.finishedTopics,
        [category]: true,
      },
    })),
}));

export default unlockNextLevel;
