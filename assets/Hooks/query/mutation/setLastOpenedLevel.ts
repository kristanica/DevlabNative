import { auth, db } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { doc, setDoc } from "firebase/firestore";
import tryCatch from "../../function/tryCatch";

export const setLastOpenedLevel = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const uid = auth.currentUser?.uid;
      const userRef = doc(db, "Users", String(uid));

      const [_, error] = await tryCatch(
        setDoc(
          userRef,
          {
            lastOpenedLevel: {
              lessonId: data.lessonId,
              levelId: data.levelId,
              subject: data.subject,
              description: data.description,
              title: data.title,
            },
          },

          { merge: true }
        )
      );

      if (error) {
        throw error;
      }
    },
  });
};
