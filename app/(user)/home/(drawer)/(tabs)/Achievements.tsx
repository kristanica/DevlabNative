import React, { useState } from "react";

import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";

import { fetchAchievements } from "@/assets/API/fireBase/user/achievement/fetchAchievements";
import AchievementContainer from "@/assets/components/AchievementsComponents/AchievementContainer";
import FillScreenLoading from "@/assets/components/global/FillScreenLoading";
import RenderCounter from "@/assets/components/global/RenderCounter";
import SmallLoading from "@/assets/components/global/SmallLoading";
import AchievementSelector from "@/assets/components/screen/ACHIEVEMENTS/AchievementSelector";
import AchievementsHeader from "@/assets/components/screen/ACHIEVEMENTS/AchievementsHeader";
import claimAchievementMutation from "@/assets/Hooks/query/mutation/claimAchievementMutation";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { useIsMutating, useQuery } from "@tanstack/react-query";
import { FlatList, View } from "react-native";

const Achievements = () => {
  RenderCounter("AChievments");
  const [selectedCategory, setSelectedCategory] = useState<string>("Html");
  const { userData } = useGetUserInfo();
  const { data: achievementsData, isLoading } = useQuery({
    queryKey: ["Achievement", selectedCategory],
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

        <CustomGeneralContainer>
          <AchievementsHeader
            userData={userData}
            userAchievements={userAchievements}
          ></AchievementsHeader>

          <AchievementSelector
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          ></AchievementSelector>

          <View className="bg-accent flex-[2] ">
            <View className="flex-[1] ">
              {isLoading ? (
                <SmallLoading></SmallLoading>
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  }}
                  numColumns={2}
                  columnWrapperStyle={{
                    justifyContent: "space-between",
                  }}
                  keyExtractor={(item) => item.id}
                  data={achievementsData}
                  renderItem={({ item, index }) => {
                    const unlockedAchievement = userAchievements.find(
                      (achievement: any) => achievement.id === item.id
                    );

                    const isUnlocked = !!unlockedAchievement;
                    const isClaimed = unlockedAchievement?.isClaimed ?? false;

                    return (
                      <AchievementContainer
                        isUnlocked={isUnlocked}
                        index={index}
                        data={item}
                        claimMutation={() =>
                          claimAchievement.mutate({
                            achievementId: item.id,
                            expReward: item.expReward,
                            coinsReward: item.coinsReward,
                          })
                        }
                        isClaimed={isClaimed}
                        selectedCategory={selectedCategory}
                      />
                    );
                  }}
                />
              )}
            </View>
          </View>
        </CustomGeneralContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default Achievements;
//  <ProtectedRoutes>
//     <View className="flex-1 bg-accent">
//       {isMutating > 0 && (
//         <FillScreenLoading text="Claiming..."></FillScreenLoading>
//       )}
//       <AnimatedViewContainer>
//         <CustomGeneralContainer>
//           <AchievementsHeader
//             userData={userData}
//             userAchievements={userAchievements}
//           ></AchievementsHeader>

//           <AchievementSelector
//             setSelectedCategory={setSelectedCategory}
//             selectedCategory={selectedCategory}
//           ></AchievementSelector>

//           <View className="flex-[2] ">
//             {isLoading ? (
//               <SmallLoading></SmallLoading>
//             ) : (
//               <AchievementList
//                 achievementsData={achievementsData}
//                 userAchievements={userAchievements}
//                 claimAchievement={claimAchievement}
//                 selectedCategory={selectedCategory}
//               ></AchievementList>
//             )}
//           </View>
//         </CustomGeneralContainer>
//       </AnimatedViewContainer>
//     </View>
//   </ProtectedRoutes>
