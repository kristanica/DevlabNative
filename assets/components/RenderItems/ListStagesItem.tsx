import { router } from "expo-router";
import React, { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import StagesContainer from "../LessonsComponent/StagesContainer";

const ListStagesItem = (
  levelPayload: {
    category: string;
    lessonId: string;
    levelId: string;
  },
  levelsData: any,
  userStagesProgress: any,
  globalCounter: number,
  setLastStageVisibility: any,
  lockedModal: any,
  stageId: any
) => {
  const pressStage = useCallback(
    (item: any, isStageLocked: boolean, levelPayload: any) => {
      {
        setLastStageVisibility(false);
        stageId.current = item.id;
        if (!isStageLocked) {
          lockedModal.setVisibility(true);
          return null;
        }
        if (
          levelPayload?.category &&
          levelPayload?.lessonId &&
          levelPayload?.levelId &&
          stageId
        ) {
          router.push({
            pathname: "/(user)/home/stage/[stageId]",
            params: {
              stageId: stageId.current,
              category: levelPayload.category,
              lessonId: levelPayload.lessonId,
              levelId: levelPayload.levelId,
            },
          });
        }
      }
    },
    [levelsData]
  );

  const renderItem = useCallback(({ item, index }: any) => {
    {
      if (!item || !item.id || !item.title || !item.description) {
        console.warn("Null or invalid item in levelsData", item);
        return null;
      }
      const stageKey = `${levelPayload?.lessonId}-${levelPayload?.levelId}-${item.id}`;
      const isStageLocked =
        (userStagesProgress[stageKey]?.isActive &&
          userStagesProgress[stageKey]?.isCompleted) ??
        false;
      globalCounter++;

      return (
        <Pressable
          onPress={() => pressStage(item, isStageLocked, levelPayload)}
        >
          <StagesContainer
            isLocked={isStageLocked}
            stageInformation={{
              id: item.id,
              title: item.title,
              description: item.description,
              ...(item || {}),
            }}
            index={index}
          ></StagesContainer>
        </Pressable>
      );
    }
  }, []);

  return { renderItem };
};

export default ListStagesItem;

const styles = StyleSheet.create({});
