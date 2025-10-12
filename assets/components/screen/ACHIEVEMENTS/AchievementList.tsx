import { useCallback } from "react";
import { FlatList } from "react-native";
import AchievementContainer from "../../AchievementsComponents/AchievementContainer";
type AchievementListPayload = {
  achievementsData: any;
  userAchievements: any;
  claimAchievement: any;
  selectedCategory: string;
};
const AchievementList = ({
  achievementsData,
  userAchievements,
  claimAchievement,
  selectedCategory,
}: AchievementListPayload) => {
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      const unlockedAchievement = userAchievements.find(
        (achievement: any) => achievement.id === item.id
      );

      const isUnlocked = !!unlockedAchievement;
      const isClaimed = unlockedAchievement?.isClaimed ?? false;

      const onClaim = () => {
        claimAchievement.mutate({
          achievementId: item.id,
          expReward: item.expReward,
          coinsReward: item.coinsReward,
        });
      };
      return (
        <AchievementContainer
          isUnlocked={isUnlocked}
          index={index}
          data={item}
          claimMutation={onClaim}
          isClaimed={isClaimed}
          selectedCategory={selectedCategory}
        />
      );
    },
    [claimAchievement, achievementsData, userAchievements, selectedCategory]
  );
  return (
    <>
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
        renderItem={renderItem}
      />
    </>
  );
};

export default AchievementList;
