import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../constants/constants";

const useChangeUserInfo = () => {
  const changeUserInfo = async (userName: string, bio: string) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      const userRef = doc(db, "Users", user.uid);

      await updateDoc(userRef, {
        username: userName,
        bio: bio,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return changeUserInfo;
};

export default useChangeUserInfo;
