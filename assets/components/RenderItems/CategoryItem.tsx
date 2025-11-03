import { FlashList } from "@shopify/flash-list";
import React from "react";
import LevelItem from "./category/LevelItem";
import StageItem from "./category/StageItem";

//Renders the item needed for the [categoryid]
const CategoryItem = ({
  setShowLevelKey,
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
      {/* Renders the upper level (The level itslef) */}
      <LevelItem
        setShownLevelKey={setShowLevelKey}
        setStageData={setStageData}
        setStageVisibility={setStageVisibility}
        categoryId={String(categoryId)}
        item={item}
        isShown={isShown}
        isLevelLocked={isLevelLocked}
        index={index}
        meta={meta}
        keyId={keyId}
        setLockModalVisibility={setLockModalVisibility}
        useUserProgressData={useUserProgressData}
      ></LevelItem>
      {/* Once the levelis pressed, wil lrender all the stages under it */}
      {stageVisibility[keyId] && (
        <FlashList
          estimatedItemSize={112}
          data={item.stages
            ?.slice() // create a copy so original data isn't mutated
            .sort((a: any, b: any) => a.order - b.order)} // sort by levelOrder
          className="bg-[#101727] mx-3 rounded-2xl"
          keyExtractor={(stage: any) =>
            `${item.lessonId}-${item.levelId}-${stage.id}`
          }
          renderItem={({ item: stage, index }) => {
            // Determines wheter the stage is locked or unlocked
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
