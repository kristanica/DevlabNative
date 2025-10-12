import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";

import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import HomeInventory from "@/assets/components/screen/HOME/HomeInventory";
import JumpBackIn from "@/assets/components/screen/HOME/JumpBackIn";
import ProfileHeader from "@/assets/components/screen/HOME/ProfileHeader";
import UserProgress from "@/assets/components/screen/HOME/UserProgress";
import { lessons } from "@/assets/constants/constants";
import tracker from "@/assets/zustand/tracker";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { router } from "expo-router";
import { useCallback } from "react";

import { ScrollView, View } from "react-native";
export default function Home() {
  const { userData, inventory } = useGetUserInfo();

  const setLevelPayload = tracker((state) => state.setTracker);
  const setLastStageVisibility = tracker(
    (state) => state.setLastStageVisibility
  );

  const handleJumpBackIn = useCallback(() => {
    setLevelPayload({
      category: userData?.lastOpenedLevel.subject!,
      lessonId: userData?.lastOpenedLevel.lessonId!,
      levelId: userData?.lastOpenedLevel.levelId!,
    });
    setLastStageVisibility(true);
    router.push({
      pathname: `/home/category/[categoryId]`,
      params: {
        categoryId: String(userData?.lastOpenedLevel?.subject),
      },
    });
  }, []);

  return (
    <ProtectedRoutes>
      <View className="flex-[1] bg-accent">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <ProfileHeader userData={userData}></ProfileHeader>

            <ScrollView
              bounces={true}
              showsVerticalScrollIndicator={false}
              className="flex-[3]  "
            >
              <JumpBackIn handleJumpBackIn={handleJumpBackIn}></JumpBackIn>
              <UserProgress lessons={lessons}></UserProgress>

              <HomeInventory inventory={inventory}></HomeInventory>
            </ScrollView>
          </CustomGeneralContainer>
        </AnimatedViewContainer>
      </View>
    </ProtectedRoutes>
  );
}
