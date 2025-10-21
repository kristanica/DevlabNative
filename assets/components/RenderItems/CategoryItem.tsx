import { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
import LessonContainer from "../LessonsComponent/LessonContainer";

export const CategoryItem = (
  useUserProgressData: any,

  meta: any,
  setVisibility: any,
  setTracker: any,
  setCoinsAndExp: any,
  setStagesVisibility: any,
  id: any
) => {
  const [stageVisibility, setStageVisiblity] = useState<any>({});

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

  const renderItem = ({ item, index }: any) => {
    const key = `${item.lessonId}-${item.levelId}`;

    const isLevelLocked =
      useUserProgressData?.allProgress?.[key]?.isActive ?? false;

    return (
      <>
        <Pressable
          className="h-[500px]"
          onPress={() => {
            console.log("hey");
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

        {stageVisibility[key] &&
          item.stages.map((stage: any) => (
            <View key={stage.id} className="h-[500px]">
              <Text>{stage.id}</Text>
            </View>
          ))}
      </>
    );
  };

  return { renderItem };
};
