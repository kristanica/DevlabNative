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
          className="bg-background mx-3"
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
// const [stageVisibility, setStageVisiblity] = useState<any>({});

// const handleStageTracker = useCallback(
//   (isLevelLocked: boolean, item: any) => {
//     if (!isLevelLocked) {
//       setVisibility(true);
//     } else {
//       setTracker({
//         category: id,
//         lessonId: item.lessonId,
//         levelId: item.levelId,
//       });
//       setCoinsAndExp({
//         coins: item.coinsReward,
//         exp: item.expReward,
//       });

//       setStagesVisibility(true);
//     }
//   },
//   []
// );

// const renderItem = ({ item, index }: any) => {
//   const key = `${item.lessonId}-${item.levelId}`;

//   const isLevelLocked =
//     useUserProgressData?.allProgress?.[key]?.isActive ?? false;

//   return (
//     <>
//       <Pressable
//         className="h-[500px]"
//         onPress={() => {
//           console.log("hey");
//         }}
//       >
//         <LessonContainer
//           isLocked={!isLevelLocked}
//           levelInformation={item}
//           index={index}
//           icon={
//             meta.ionIcon as
//               | "cube"
//               | "logo-javascript"
//               | "logo-html5"
//               | "logo-css3"
//           }
//         ></LessonContainer>
//       </Pressable>

//       {stageVisibility[key] &&
//         item.stages.map((stage: any) => (
//           <View key={stage.id} className="h-[500px]">
//             <Text>{stage.id}</Text>
//           </View>
//         ))}
//     </>
//   );
// };
