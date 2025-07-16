import { doc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { auth, db } from "../constants/constants";
import useMounted from "./useMounted";

const useChangeUserInfo = () => {
  const isMounted = useMounted();
  const changeUserInfo = useCallback(
    async (userName: string, bio: string) => {
      const user = auth.currentUser;

      if (!user || !isMounted.current) return;

      try {
        const userRef = doc(db, "Users", user.uid);
        if (isMounted.current) {
          await updateDoc(userRef, {
            username: userName,
            bio: bio,
          });
        }
      } catch (error) {
        if (isMounted.current) {
          console.log(error);
        }
      }
    },
    [isMounted]
  );
  return changeUserInfo;
};

export default useChangeUserInfo;
