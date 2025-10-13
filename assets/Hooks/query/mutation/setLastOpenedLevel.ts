import { auth, db } from "@/assets/constants/constants";
import { useMutation } from "@tanstack/react-query";
import { doc, setDoc } from "firebase/firestore";
import tryCatch from "../../function/tryCatch";

export const setLastOpenedLevel = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      console.log(data);
      const uid = auth.currentUser?.uid;
      const userRef = doc(db, "Users", String(uid));
      console.log(uid);

      const [_, error] = await tryCatch(
        setDoc(
          userRef,
          {
            lastOpenedLevel: {
              lessonId: data.lessonId,
              levelId: data.levelId,
              subject: data.category,
            },
          },

          { merge: true }
        )
      );

      if (error) {
        console.log(error);
        return;
      }
    },
  });
};
