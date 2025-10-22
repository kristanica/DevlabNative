import React, { startTransition, useCallback } from "react";
import { Pressable } from "react-native";
import LessonContainer from "../../LessonsComponent/LessonContainer";

const LevelItem = ({
  setShownLevelKey,
  setCoinsAndExp,
  setStageData,
  setStageVisibility,
  categoryId,
  item,
  isShown,
  isLevelLocked,
  index,
  meta,
  keyId,
}: any) => {
  const handlePress = useCallback(() => {
    const key = `${item.lessonId}-${item.levelId}`;
    startTransition(() => {
      setShownLevelKey(key);
      setCoinsAndExp({
        exp: item.expReward,
        coins: item.coinsReward,
      });
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
    setCoinsAndExp,
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
