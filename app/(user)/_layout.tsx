import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

import { BackgroundProvider } from "@/assets/zustand/BackgroundProvider";
// import { InformationProvider } from "@/assets/Provider/InformationProvider";
import useMounted from "@/assets/Hooks/useMounted";
import { ProfileProvider } from "@/assets/zustand/ProfileProvider";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import LottieView from "lottie-react-native";
import Toast, { BaseToastProps } from "react-native-toast-message";

const TabsLayout = () => {
  const getValidUser = useGetUserInfo((state) => state.getUser);
  const getUserAchivementProgress = useGetUserInfo(
    (state) => state.getUserAchievementProgress
  );

  // const isMutating = useIsMutating();

  const isMounted = useMounted();
  useEffect(() => {
    if (!isMounted.current) return;
    getValidUser();
    getUserAchivementProgress();
  }, []);

  return (
    <ProfileProvider>
      <BackgroundProvider>
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
                      You've claimed an Achivement!
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
      </BackgroundProvider>
    </ProfileProvider>
  );
};

export default TabsLayout;
