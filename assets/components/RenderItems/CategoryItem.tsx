import { useCallback } from "react";
import { Pressable } from "react-native";
import LessonContainer from "../LessonsComponent/LessonContainer";

export const CategoryItem = (
  useUserProgressData: any,

  meta: any,
  setVisibility: any,
  setTracker: any,
  setCoinsAndExp: any,
  setStagesVisibility: any,
  id: any,
  categoryId: string
) => {
  const handleStageTracker = useCallback(
    (isLevelLocked: boolean, item: any) => {
      if (!isLevelLocked) {
        setVisibility(true);
      } else {
        setTracker({
          category: id,
          lessonId: item.lessonId,
          levelId: item.levelId,
        });
        setCoinsAndExp({
          coins: item.coinsReward,
          exp: item.expReward,
        });

        setStagesVisibility(true);
      }
    },
    []
  );

  const renderItem = useCallback(
    ({ item, index }: any) => {
      const key = `${item.lessonId}-${item.levelId}`; // Access data directly from query

      const isLevelLocked =
        useUserProgressData?.allProgress?.[key]?.isActive ?? false;

      return (
        <Pressable
          onPress={() => {
            handleStageTracker(isLevelLocked, item);
          }}
        >
          <LessonContainer
            isLocked={!isLevelLocked}
            levelInformation={item}
            index={index}
            icon={
              meta.ionIcon as
                | "cube"
                | "logo-javascript"
                | "logo-html5"
                | "logo-css3"
            }
          ></LessonContainer>
        </Pressable>
      );
    },
    [useUserProgressData]
  );

  return { renderItem };
};
