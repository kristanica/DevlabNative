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
  // If the stage is pressed, will navigate to its corresponding screen
  const handlePress = useCallback(() => {
    // Determines wether stage is locked
    if (!isStageLocked) {
      setLockModalVisibility(true);
      return;
    }

    router.push({
      pathname: "/(user)/home/stage/[stageId]",
      params: {
        stageId: stage.id,
        category: String(categoryId),
        lessonId: lessonId,
        levelId: levelId,
      },
    });
  }, [stage.id, categoryId, lessonId, levelId]);

  return (
    <>
      <TouchableOpacity key={stage.id} onPress={handlePress}>
        {/* The rendering of the stage itself */}

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
