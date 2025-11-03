import React, { startTransition, useCallback } from "react";
import { Pressable } from "react-native";
import LessonContainer from "../../LessonsComponent/LessonContainer";

// Renders the upper level (Level)
const LevelItem = ({
  setShownLevelKey,

  setStageData,
  setStageVisibility,
  categoryId,
  item,
  isShown,
  isLevelLocked,
  index,
  meta,
  keyId,
  useUserProgressData,
  setLockModalVisibility,
}: any) => {
  const handlePress = useCallback(() => {
    const key = `${item.lessonId}-${item.levelId}`;
    if (!useUserProgressData.allProgress[key]) {
      setLockModalVisibility(true);
      return;
    }
    startTransition(() => {
      setShownLevelKey(key);
      setStageData(String(categoryId), item.stages);
      setStageVisibility((prev: any) => ({
        ...prev,
        [key]: !prev[key],
      }));
    });
  }, [
    keyId,
    item,
    categoryId,
    setShownLevelKey,

    setStageData,
    setStageVisibility,
  ]);
  return (
    <>
      <Pressable onPress={handlePress}>
        <LessonContainer
          isShown={isShown}
          isLocked={isLevelLocked}
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
    </>
  );
};

export default React.memo(LevelItem);
