import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteDoc,
  doc,
  DocumentSnapshot,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../constants/constants";
import tracker from "../zustand/tracker";
type levelDataType = {
  title: string;
  description: string;
  coinsReward: number;
  expReward: number;
};
const useLevelEditor = () => {
  const payload = tracker((state) => state.levelPayload);
  const queryClient = useQueryClient();
  const { data: levelData } = useQuery({
    queryKey: [
      "Edit Lesson",
      payload?.category,
      payload?.lessonId,
      payload?.levelId,
    ],
    queryFn: async () => {
      if (!payload) {
        return null;
      }
      try {
        const levelRef = doc(
          db,
          payload.category,
          payload.lessonId,
          "Levels",
          payload.levelId
        );

        const levelData: DocumentSnapshot = await getDoc(levelRef);

        if (!levelData.data()) {
          return null;
        }

        return levelData.data() as levelDataType;
      } catch {
        return null;
      }
    },
  });

  const updateLessonMutation = useMutation({
    mutationFn: async ({ state }: { state: any }) => {
      if (!payload) {
        return null;
      }
      try {
        const levelRef = doc(
          db,
          payload.category,
          payload.lessonId,
          "Levels",
          payload.levelId
        );

        await setDoc(
          levelRef,
          {
            ...state,
            expReward: Number(state.expReward),
            coinsReward: Number(state.coinsReward),
          },
          { merge: true }
        );
      } catch {
        return null;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lesson admin", payload?.category],
      });
    },
  });
  const deleteLevelMutation = useMutation({
    mutationFn: async () => {
      if (!payload) {
        return null;
      }
      try {
        const levelRef = doc(
          db,
          payload.category,
          payload.lessonId,
          "Levels",
          payload.levelId
        );
        await deleteDoc(levelRef);
      } catch {}
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lesson admin", payload?.category],
      });
    },
  });
  return { levelData, updateLessonMutation, deleteLevelMutation };
};
export default useLevelEditor;
