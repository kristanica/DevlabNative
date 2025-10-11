import { auth, URL } from "@/assets/constants/constants";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export const useUserProgress = (category: string) => {
  const { setUserProgress, allProgressLevels, allProgressStages } =
    useGetUserInfo();

  const query = useQuery({
    queryKey: ["userProgress", category],
    queryFn: async () => {
      const token = await auth.currentUser?.getIdToken(true);
      const response = await axios.get(
        `${URL}/fireBase/userProgres/${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    },

    enabled: !!category, // Only run if category exists
  });

  useEffect(() => {
    if (query.data && category) {
      setUserProgress({
        allProgressLevels: {
          ...allProgressLevels,
          [category]: query.data.allStages,
        },
        allProgressStages: {
          ...allProgressStages,
          [category]: query.data.allProgressLevels,
        },
        completedLevels: query.data.completedLevels,
        completedStages: query.data.completedStages,
      });
    }
  }, [query.data, category]);

  return query;
};
