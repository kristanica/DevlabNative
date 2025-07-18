import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db, path } from "../constants/constants";

const useGetUserInfo = (p0: (state: any) => any) => {
  const [userData, setUserData] = useState<any>();
  useEffect(() => {
    const getUser = async () => {
      const uid = auth.currentUser?.uid;

      if (!uid) {
        console.log("No user UID found.");
        router.replace({ pathname: path.LOGIN });
        return;
      }
      try {
        const userRef = doc(db, "Users", uid);
        const data = await getDoc(userRef);
        if (data.exists()) {
          const userData = data.data();
          setUserData(userData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return userData;
};

export default useGetUserInfo;
