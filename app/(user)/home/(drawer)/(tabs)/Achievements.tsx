import React, { useState } from "react";

import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";

import { fetchAchievements } from "@/assets/API/fireBase/user/achievement/fetchAchievements";
import FillScreenLoading from "@/assets/components/global/FillScreenLoading";
import RenderCounter from "@/assets/components/global/RenderCounter";
import SmallLoading from "@/assets/components/global/SmallLoading";
import AchievementList from "@/assets/components/screen/ACHIEVEMENTS/AchievementList";
import AchievementSelector from "@/assets/components/screen/ACHIEVEMENTS/AchievementSelector";
import AchievementsHeader from "@/assets/components/screen/ACHIEVEMENTS/AchievementsHeader";
import claimAchievementMutation from "@/assets/Hooks/query/mutation/claimAchievementMutation";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { useIsMutating, useQuery } from "@tanstack/react-query";
import { View } from "react-native";

const Achievements = () => {
  RenderCounter("AChievments");
  const [selectedCategory, setSelectedCategory] = useState<string>("Html");
  const { userData } = useGetUserInfo();
  const { data: achievementsData, isLoading } = useQuery({
    queryKey: ["Achievement1", selectedCategory],
    queryFn: () => fetchAchievements(selectedCategory),
    staleTime: 5 * 60 * 1000,
  });
  const userAchievements = useGetUserInfo((state) => state.userAchievements);
  const claimAchievement = claimAchievementMutation();
  const isMutating = useIsMutating();
  return (
    <ProtectedRoutes>
      <View className="flex-1 bg-accent">
        {isMutating > 0 && (
          <FillScreenLoading text="Claiming..."></FillScreenLoading>
        )}
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <AchievementsHeader
              userData={userData}
              userAchievements={userAchievements}
            ></AchievementsHeader>

            <AchievementSelector
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            ></AchievementSelector>

            <View className="flex-[2] ">
              {isLoading ? (
                <SmallLoading></SmallLoading>
              ) : (
                <AchievementList
                  achievementsData={achievementsData}
                  userAchievements={userAchievements}
                  claimAchievement={claimAchievement}
                  selectedCategory={selectedCategory}
                ></AchievementList>
              )}
            </View>
          </CustomGeneralContainer>
        </AnimatedViewContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default Achievements;
