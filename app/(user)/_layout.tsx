import { Stack } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

// import { InformationProvider } from "@/assets/Provider/InformationProvider";

import { fetchAchievements } from "@/assets/API/fireBase/user/achievement/fetchAchievements";
import { activeLevelCounter } from "@/assets/API/fireBase/user/activeLevelCounter";
import { fetchContent } from "@/assets/API/fireBase/user/fetchContent";
import { userProgress } from "@/assets/API/fireBase/user/fetchUserProgress";
import { fetchShopItems } from "@/assets/API/fireBase/user/shop/fetchShopItems";
import BootingLoadingScreen from "@/assets/components/global/BootingLoadingScreen";
import { auth } from "@/assets/constants/constants";
import { loadSounds, unloadSounds } from "@/assets/Hooks/function/soundHandler";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { useStageStore } from "@/assets/zustand/useStageStore";
import { useQueryClient } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";

const TabsLayout = () => {
  const [isReady, setIsReady] = useState(false);
  const queryClient = useQueryClient();
  const getValidUser = useGetUserInfo((state) => state.getUser);
  const useSetStageStore = useStageStore((state) => state.setStageData);

  const getUserAchivementProgress = useGetUserInfo(
    (state) => state.getUserAchievementProgress
  );
  const category = ["Html", "Css", "JavaScript", "Database"];

  const preFetchAchievements = useCallback(() => {
    return Promise.allSettled(
      category.map((val: string) =>
        queryClient.ensureQueryData({
          queryKey: ["Achievement", val],
          queryFn: () => fetchAchievements(val),
          staleTime: 10 * 60 * 1000,
          gcTime: Infinity,
        })
      )
    );
  }, [queryClient]);
  // const preFetchStageData = useCallback(
  //   (currentUserData: any) => {
  //     console.log(currentUserData["Html"] + "WOAAAAAAAAAAAAAAAAAAAh");
  //     return Promise.all(
  //       category.map((val: string) =>
  //         queryClient.ensureQueryData({
  //           queryKey: [
  //             "SampleStages",
  //             currentUserData[val].subject,
  //             currentUserData[val].lessonId,
  //             currentUserData[val].levelId,
  //           ],
  //           queryFn: async () => {
  //             const token = await auth.currentUser?.getIdToken(true);
  //             const [res, error] = await tryCatch(
  //               axios.get(
  //                 `${URL}/fireBase/getSpecificStage/${currentUserData[val].subject}/${currentUserData[val].lessonId}/${currentUserData[val].levelId}`,
  //                 {
  //                   headers: {
  //                     Authorization: `Bearer ${token}`,
  //                   },
  //                 }
  //               )
  //             );

  //             if (error) {
  //               console.log(error);
  //               return null; // ✅ ensure no undefined return
  //             }

  //             const data = res?.data;
  //             useSetStageStore(val, data);
  //             return data;
  //           },
  //         })
  //       )
  //     );
  //   },
  //   [queryClient]
  // );

  const preFetchContent = useCallback(() => {
    return Promise.all(
      category.map((subject: string) =>
        queryClient.ensureQueryData({
          queryKey: ["getAllData", subject],
          queryFn: () => fetchContent(subject),
          gcTime: Infinity,
          staleTime: Infinity,
        })
      )
    );
  }, [queryClient]);

  useEffect(() => {
    let cleanupUser: any = null;

    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("What?");
        return;
      }
      const loadProgress = async () => {
        cleanupUser = await getValidUser();
        const currentUserData =
          useGetUserInfo.getState().userData?.lastOpenedLevel;

        const promises: Promise<any>[] = [
          preFetchAchievements(),
          loadSounds(),
          preFetchContent(),
          getUserAchivementProgress(),
          queryClient.ensureQueryData({
            queryKey: ["ActiveLeveld"],
            queryFn: activeLevelCounter,
          }),
          queryClient.ensureQueryData({
            queryKey: ["userProgress"],
            queryFn: userProgress,
          }),
          queryClient.ensureQueryData({
            queryKey: ["shopItems"],
            queryFn: fetchShopItems,
            staleTime: 10 * 60 * 1000,
          }),
        ];
        // if (currentUserData) {
        //   console.log(currentUserData?.subject + "RAAAAAAAAAAAAAAAAAAAAN");
        //   promises.push(preFetchStageData(currentUserData));
        // } else {
        //   console.log(
        //     "⚠️ Skipping Stages query because lastOpenedLevel is missing."
        //   );
        // }
        const result = await Promise.allSettled(promises);
        result.forEach(async (error, index) => {
          if (error.status === "rejected")
            console.log(`Query ${index} failed because of ${error.reason}`);
          return;
        });

        const isAllFulfiled = result.every(
          (item) => item.status === "fulfilled"
        );

        if (isAllFulfiled) {
          setIsReady(true);
        }
      };
      console.log("ASDasdasd");
      loadProgress();
    });
    return () => {
      unsub();
      cleanupUser?.();
      unloadSounds();
    };
  }, []);

  if (!isReady) {
    return (
      <>
        <BootingLoadingScreen></BootingLoadingScreen>
      </>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
    </View>
  );
};

export default TabsLayout;
