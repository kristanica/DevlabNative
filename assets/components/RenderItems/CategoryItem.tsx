import { FlashList } from "@shopify/flash-list";
import React from "react";
import LevelItem from "./category/LevelItem";
import StageItem from "./category/StageItem";

const CategoryItem = ({
  setShowLevelKey,
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
  stageVisibility,
  useUserProgressData,
  setLockModalVisibility,
}: any) => {
  return (
    <>
      <LevelItem
        setShownLevelKey={setShowLevelKey}
        setCoinsAndExp={setCoinsAndExp}
        setStageData={setStageData}
        setStageVisibility={setStageVisibility}
        categoryId={String(categoryId)}
        item={item}
        isShown={isShown}
        isLevelLocked={isLevelLocked}
        index={index}
        meta={meta}
        keyId={keyId}
      ></LevelItem>
      {stageVisibility[keyId] && (
        <FlashList
          estimatedItemSize={112}
          data={item.stages}
          className="bg-[#101727] mx-3 rounded-2xl"
          keyExtractor={(stage: any) =>
            `${item.lessonId}-${item.levelId}-${stage.id}`
          }
          renderItem={({ item: stage, index }) => {
            const stageKey = `${item?.lessonId}-${item?.levelId}-${stage.id}`;
            const isStageLocked =
              useUserProgressData?.allStagesComplete[stageKey];

            // NOTE: If stage is not unlocked yet and is hidden, skips it. Resulting
            if (!isStageLocked && stage.isHidden) {
              return null;
            }

            return (
              <StageItem
                setLockModalVisibility={setLockModalVisibility}
                stage={stage}
                isStageLocked={isStageLocked}
                index={index}
                stageId={stage.id}
                categoryId={String(categoryId)}
                lessonId={item.lessonId}
                levelId={item.levelId}
              ></StageItem>
            );
          }}
        ></FlashList>
      )}
    </>
  );
};
export default React.memo(CategoryItem);
