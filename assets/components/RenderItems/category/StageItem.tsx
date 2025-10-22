import { router } from "expo-router";
import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import StagesContainer from "../../LessonsComponent/StagesContainer";

const StageItem = ({
  stage,
  isStageLocked,
  index,
  categoryId,
  lessonId,
  levelId,
  setLockModalVisibility,
}: any) => {
  const handlePress = useCallback(() => {
    if (!isStageLocked) {
      setLockModalVisibility(true);
      return;
    }
    // console.log(stage.id, categoryId, lessonId, levelId);
    router.push({
      pathname: "/(user)/home/stage/[stageId]",
      params: {
        stageId: stage.id,
        category: String(categoryId), // Use categoryId directly
        lessonId: lessonId,
        levelId: levelId,
      },
    });
  }, [stage.id, categoryId, lessonId, levelId]);

  return (
    <>
      <TouchableOpacity key={stage.id} onPress={handlePress}>
        <StagesContainer
          isLocked={isStageLocked}
          stageInformation={{
            id: stage.id,
            title: stage.title,
            description: stage.description,
            ...(stage || {}),
          }}
          index={index}
        ></StagesContainer>
      </TouchableOpacity>
    </>
  );
};

export default React.memo(StageItem);
