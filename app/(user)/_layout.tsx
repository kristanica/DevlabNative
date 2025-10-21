import { Stack } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";

// import { InformationProvider } from "@/assets/Provider/InformationProvider";

import { fetchAchievements } from "@/assets/API/fireBase/user/achievement/fetchAchievements";
import { activeLevelCounter } from "@/assets/API/fireBase/user/activeLevelCounter";
import { userProgress } from "@/assets/API/fireBase/user/fetchUserProgress";
import { fetchShopItems } from "@/assets/API/fireBase/user/shop/fetchShopItems";
import BootingLoadingScreen from "@/assets/components/global/BootingLoadingScreen";
import { auth, URL } from "@/assets/constants/constants";
import { loadSounds } from "@/assets/Hooks/function/soundHandler";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { useStageStore } from "@/assets/zustand/useStageStore";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import LottieView from "lottie-react-native";
import Toast, { BaseToastProps } from "react-native-toast-message";

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
        })
      )
    );
  }, []);
  const preFetchStageData = useCallback((currentUserData: any) => {
    console.log(currentUserData["Html"] + "WOAAAAAAAAAAAAAAAAAAAh");
    return Promise.all(
      category.map((val: string) =>
        queryClient.ensureQueryData({
          queryKey: [
            "SampleStages",
            currentUserData[val].subject,
            currentUserData[val].lessonId,
            currentUserData[val].levelId,
          ],
          queryFn: async () => {
            const token = await auth.currentUser?.getIdToken(true);
            const [res, error] = await tryCatch(
              axios.get(
                `${URL}/fireBase/getSpecificStage/${currentUserData[val].subject}/${currentUserData[val].lessonId}/${currentUserData[val].levelId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
            );

            if (error) {
              console.log(error);
              return null; // ✅ ensure no undefined return
            }

            const data = res?.data;
            useSetStageStore(val, data);
            return data;
          },
        })
      )
    );
  }, []);

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
        if (currentUserData) {
          console.log(currentUserData?.subject + "RAAAAAAAAAAAAAAAAAAAAN");
          promises.push(preFetchStageData(currentUserData));
        } else {
          console.log(
            "⚠️ Skipping Stages query because lastOpenedLevel is missing."
          );
        }
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

      <Toast
        config={{
          claimAchievement: (props: BaseToastProps) => (
            <View className="h-[60px]   flex-row w-[50%] mx-2 z-50 bg-[#fefefe] border-modal border-[2px] rounded-xl justify-center items-center absolute ">
              <LottieView
                source={require("@/assets/Lottie/onboarding/onBoardingScreen3.json")}
                autoPlay={true}
                style={{
                  height: 30,
                  width: 30,
                }}
              />
              <View>
                <Text className="text-black xs: text-xs font-exoExtraBold">
                  {"You've claimed an Achivement!"}
                </Text>
                <Text className="text-[#4e4747]  xs: text-[8px] font-exoExtraBold">
                  Coins Reward: {props.text1} 🪙
                </Text>

                <Text className="text-[#4e4747]  xs: text-[8px] font-exoExtraBold">
                  Exp Reward: {props.text2} 🌟
                </Text>
              </View>
              <LottieView
                source={require("@/assets/Lottie/coneffite.json")}
                autoPlay={true}
                style={{
                  height: 100,
                  width: 100,
                  position: "absolute",
                }}
              />
            </View>
          ),
        }}
      />
    </View>
  );
};

export default TabsLayout;
