import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import RenderCounter from "@/assets/components/global/RenderCounter";
import SmallLoading from "@/assets/components/global/SmallLoading";
import LessonContainer from "@/assets/components/LessonsComponent/LessonContainer";
import LockLessonModal from "@/assets/components/LessonsComponent/LockLessonModal";
import StagesContainer from "@/assets/components/LessonsComponent/StagesContainer";
import CategoryHeader from "@/assets/components/screen/CATEGORY/CategoryHeader";
import { auth, lessonMetaData, URL } from "@/assets/constants/constants";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import useModal from "@/assets/Hooks/useModal";
import { setCoinsandExp } from "@/assets/zustand/setCoinsandExp";
import { unlockedStages } from "@/assets/zustand/unlockedStages";
import { useStageStore } from "@/assets/zustand/useStageStore";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CategoryScreen = () => {
  RenderCounter("categoryid");
  const { categoryId } = useLocalSearchParams();
  const { visibility, setVisibility, scaleStyle, closeModal } = useModal();
  // const [stagesVisibility, setStagesVisibility] = useState<boolean>(false);

  // const { setTracker, lastStageVisibility, setLastStageVisibility } = tracker(
  //   useShallow((state) => ({
  //     setTracker: state.setTracker,
  //     lastStageVisibility: state.lastStageVisibility,
  //     setLastStageVisibility: state.setLastStageVisibility,
  //   }))
  // );
  const setCoinsAndExp = setCoinsandExp((state) => state.setCoinsAndExp);
  const id = categoryId as keyof typeof lessonMetaData;
  const meta = lessonMetaData[id];
  const setUnlockedStages = unlockedStages((state) => state.setUnlockedStages);
  // const stageData = useStageStore((state) => state.stageData);

  // const { fetchedLesson, isLoading } = fetchLesson(id);
  const setStageData = useStageStore((state) => state.setStageData);
  const {
    data: useUserProgressData,
    isLoading: progressLoading,
    isRefetching: isRefetching,
    refetch: refetchUserProgress,
  } = useQuery({
    queryKey: ["specificUserProgress", String(categoryId)],
    queryFn: async () => {
      const token = await auth.currentUser?.getIdToken(true);
      const response = await axios.get(
        `${URL}/fireBase/userProgres/${String(categoryId)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUnlockedStages(response.data.allStagesComplete);
      console.log(response.data.allStagesComplete);
      return response.data;
    },
  });

  // const stageVisibilility = useCallback(() => {
  //   setStagesVisibility(false);
  //   setLastStageVisibility(false);
  // }, [setStagesVisibility, setLastStageVisibility]);

  // const { renderItem } = CategoryItem(
  //   useUserProgressData,
  //   meta,
  //   setVisibility,
  //   setTracker,
  //   setCoinsAndExp,
  //   setStagesVisibility,
  //   id
  // );

  const { data: allData, isLoading } = useQuery({
    queryKey: ["getAllData", categoryId],
    queryFn: async () => {
      const token = await auth.currentUser?.getIdToken(true);
      const [data, error] = await tryCatch(
        axios.get(`${URL}/fireBase/getAllData/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      if (error) {
        throw error;
      }

      return data.data;
    },
  });

  const temp = useMemo(() => {
    return allData
      ? allData.map((item: any) => ({
          title: item.Lesson,
          data: item.levels.map((levelData: any) => ({
            levelId: levelData.id,
            lessonId: item.id,
            ...levelData,
          })),
        }))
      : [];
  }, [allData]);
  const [stageVisibility, setStageVisiblity] = useState<any>({});

  const [selectedStage, setSelectedStage] = useState<any>(null);
  const [shownLevelKey, setShownLevelKey] = useState<string | null>(null);
  return (
    <View className="bg-accent flex-[1]">
      <CustomGeneralContainer>
        <CategoryHeader meta={meta} id={id}></CategoryHeader>

        <LockLessonModal
          onConfirm={() => closeModal()}
          visibility={visibility}
          scaleStyle={scaleStyle}
          closeModal={closeModal}
        ></LockLessonModal>
        {isLoading || progressLoading || isRefetching ? (
          <SmallLoading />
        ) : (
          <>
            <SectionList
              sections={temp}
              stickySectionHeadersEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }: any) => {
                const key = `${item.lessonId}-${item.levelId}`;

                const isLevelLocked =
                  useUserProgressData?.allProgress?.[key]?.isActive ?? false;

                return (
                  <>
                    <Pressable
                      onPress={() => {
                        const key = `${item.lessonId}-${item.levelId}`;
                        setShownLevelKey(key);
                        setCoinsAndExp({
                          exp: item.exp,
                          coins: item.coins,
                        });
                        setSelectedStage({
                          lessonId: item.lessonId,
                          levelId: item.levelId,
                          category: String(categoryId),
                        });
                        // Remove setTimeout - set immediately
                        setStageData(String(categoryId), []); // Clear first
                        setTimeout(() => {
                          setStageData(String(categoryId), item.stages); // Then set new data
                        }, 0);

                        setStageVisiblity((prev: any) => ({
                          ...prev,
                          [key]: !prev[key],
                        }));
                      }}
                    >
                      <LessonContainer
                        isShown={shownLevelKey === key}
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
                    {stageVisibility[key] && (
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
                          return (
                            <TouchableOpacity
                              key={stage.id}
                              onPress={() => {
                                router.push({
                                  pathname: "/(user)/home/stage/[stageId]",
                                  params: {
                                    stageId: stage.id,
                                    category: String(categoryId), // Use categoryId directly
                                    lessonId: item.lessonId,
                                    levelId: item.levelId,
                                  },
                                });
                              }}
                            >
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
                          );
                        }}
                      ></FlashList>
                    )}
                  </>
                );
              }}
              renderSectionHeader={({ section }) => (
                <Text className="text-white text-2xl font-exoBold mx-3 my-5">
                  Lesson {section.title}
                </Text>
              )}
            />
          </>
        )}
      </CustomGeneralContainer>
    </View>
  );
};

export default CategoryScreen;
