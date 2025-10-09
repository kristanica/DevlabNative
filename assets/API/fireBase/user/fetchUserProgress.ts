import { auth, URL } from "@/assets/constants/constants";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import axios from "axios";

export const userProgress = async () => {
  const uid = await auth.currentUser?.getIdToken(true);

  const setUserProgress = useGetUserInfo.getState().setUserProgress;

  const res = await axios.get(`${URL}/fireBase/userProgress`, {
    headers: {
      Authorization: `Bearer ${uid}`,
    },
  });

  setUserProgress({
    allProgressLevels: res.data.allProgress,
    allProgressStages: res.data.allStages,
    completedLevels: res.data.completedLevels,
    completedStages: res.data.completedStages,
  });

  console.log("THIS RAN AGAIN");
  return res.data;
};
