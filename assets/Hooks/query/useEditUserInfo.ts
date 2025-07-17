import { auth, db } from "@/assets/constants/constants";
import { doc, updateDoc } from "firebase/firestore";

const useEditUserInfo = async (userName: string, bio: string) => {
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
export default useEditUserInfo;
