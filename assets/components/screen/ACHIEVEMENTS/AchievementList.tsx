import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import React, { useCallback, useMemo } from "react";
import AchievementContainer from "../../AchievementsComponents/AchievementContainer";

type Achievement = {
  id: string;
  title: string;
  description?: string;
  expReward: number;
  coinsReward: number;
};

type UserAchievement = { id: string; isClaimed?: boolean };

type Props = {
  achievementsData: Achievement[] | null | undefined;
  userAchievements: UserAchievement[] | null | undefined;
  claimAchievement: {
    mutate: (p: {
      achievementId: string;
      expReward: number;
      coinsReward: number;
    }) => void;
  };
  selectedCategory: string;
};

const AchievementList = ({
  achievementsData,
  userAchievements,
  claimAchievement,
  selectedCategory,
}: Props) => {
  const data = achievementsData ?? [];

  const achievedMap = useMemo(() => {
    const m = new Map<string, { isClaimed?: boolean }>();
    for (const a of userAchievements ?? [])
      m.set(a.id, { isClaimed: a.isClaimed });
    return m;
  }, [userAchievements]);

  const keyExtractor = useCallback((item: Achievement) => item.id, []);
  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<Achievement>) => {
      const rec = achievedMap.get(item.id);
      const isUnlocked = !!rec;
      const isClaimed = !!rec?.isClaimed;

      const onClaim = () =>
        claimAchievement.mutate({
          achievementId: item.id,
          expReward: item.expReward,
          coinsReward: item.coinsReward,
        });

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
    [achievedMap, claimAchievement, selectedCategory]
  );

  return (
    <>
      <FlashList
        data={data}
        bounces={false}
        horizontal={false}
        numColumns={2}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
        estimatedItemSize={286}
      />
    </>
  );
};

export default AchievementList;
