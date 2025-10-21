import { activeLevelCounter } from "@/assets/API/fireBase/user/activeLevelCounter";
import { userProgress } from "@/assets/API/fireBase/user/fetchUserProgress";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import RenderCounter from "@/assets/components/global/RenderCounter";

import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import HomeInventory from "@/assets/components/screen/HOME/HomeInventory";
import JumpBackIn from "@/assets/components/screen/HOME/JumpBackIn";
import ProfileHeader from "@/assets/components/screen/HOME/ProfileHeader";
import UserProgress from "@/assets/components/screen/HOME/UserProgress";
import { lessons } from "@/assets/constants/constants";

import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";

import { useQuery } from "@tanstack/react-query";

import { ScrollView, View } from "react-native";
export default function Home() {
  RenderCounter("Home");
  const { userData, inventory } = useGetUserInfo();

  const { data: activeLevel } = useQuery({
    queryKey: ["ActiveLeveld"],
    queryFn: activeLevelCounter,
    staleTime: 5 * (60 * 1000),
  });

  const { data: progressData } = useQuery({
    queryKey: ["userProgress"],
    queryFn: userProgress,
  });

  return (
    <ProtectedRoutes>
      <View className="flex-[1] bg-accent">
        <CustomGeneralContainer>
          <ProfileHeader userData={userData}></ProfileHeader>

          <ScrollView
            bounces={true}
            showsVerticalScrollIndicator={false}
            className="flex-[3] "
          >
            <JumpBackIn
              lastOpenedLevel={userData!.lastOpenedLevel!}
            ></JumpBackIn>
            <UserProgress
              lessons={lessons}
              activeLevel={activeLevel.active}
              userProgress={progressData.specificCompletedLevels}
            ></UserProgress>

            <HomeInventory inventory={inventory}></HomeInventory>
          </ScrollView>
        </CustomGeneralContainer>
      </View>
    </ProtectedRoutes>
  );
}
