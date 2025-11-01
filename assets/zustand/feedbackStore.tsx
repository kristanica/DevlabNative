import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Feedback = {
  evaluation: string;
  feedback: string;
  stageId: string;
};

type FeedBackStoreProps = {
  feedbacks: Record<string, Feedback[]>;
  addFeedback: (subject: string, feedback: Feedback) => void;
  getFeedback: (subject: string) => Feedback[];
  clearFeedback: (subject?: string) => void;
};

export const feedbackStore = create<FeedBackStoreProps>()(
  persist(
    (set, get) => ({
      feedbacks: {},

      addFeedback: (subject, feedback) =>
        set((state) => ({
          feedbacks: {
            ...state.feedbacks,
            [subject]: [...(state.feedbacks[subject] || []), feedback],
          },
        })),

      getFeedback: (subject) => get().feedbacks[subject] || [],

      clearFeedback: (subject) => {
        if (!subject) {
          set({ feedbacks: {} });
        } else {
          set((state) => {
            const updated = { ...state.feedbacks };
            delete updated[subject];
            return { feedbacks: updated };
          });
        }
      },
    }),
    {
      name: "feedback-storage",
      storage: {
        getItem: async (subject) => {
          const value = await AsyncStorage.getItem(subject);
          return value ? JSON.parse(value) : null;
        },

        setItem: async (subject, value) => {
          await AsyncStorage.setItem(subject, JSON.stringify(value));
        },
        removeItem: async (subject) => {
          await AsyncStorage.removeItem(subject);
        },
      },
    }
  )
);
