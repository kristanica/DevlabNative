import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import RenderCounter from "@/assets/components/global/RenderCounter";
import SmallLoading from "@/assets/components/global/SmallLoading";
import LockLessonModal from "@/assets/components/LessonsComponent/LockLessonModal";
import CategoryItem from "@/assets/components/RenderItems/CategoryItem";
import CategoryHeader from "@/assets/components/screen/CATEGORY/CategoryHeader";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import useModal from "@/assets/Hooks/useModal";
import { unlockedStages } from "@/assets/zustand/unlockedStages";
import { useStageStore } from "@/assets/zustand/useStageStore";
import { auth, lessonMetaData, URL } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useMemo, useState } from "react";
import { SectionList, Text, View } from "react-native";

const CategoryScreen = () => {
  RenderCounter("categoryid");
  const { categoryId } = useLocalSearchParams();
  const { visibility, setVisibility, scaleStyle, closeModal } = useModal();

  const id = categoryId as keyof typeof lessonMetaData;
  const meta = lessonMetaData[id];
  const setUnlockedStages = unlockedStages((state) => state.setUnlockedStages);

  const setStageData = useStageStore((state) => state.setStageData);
  const {
    data: useUserProgressData,
    isLoading: progressLoading,
    isFetching: progressFetching,
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

      return response.data;
    },
  });

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
    gcTime: Infinity,
    staleTime: Infinity,
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

  const [stageVisibility, setStageVisibility] = useState<any>({});
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
        {isLoading || progressLoading || progressFetching ? (
          <View className="flex-1 justify-center items-center">
            <SmallLoading />
          </View>
        ) : (
          <>
            <SectionList
              sections={temp}
              stickySectionHeadersEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                const keyId = `${item.lessonId}-${item.levelId}`;
                const isLevelLocked = !(
                  useUserProgressData?.allProgress?.[keyId]?.isActive ?? false
                );

                return (
                  <CategoryItem
                    setLockModalVisibility={setVisibility}
                    setShowLevelKey={setShownLevelKey}
                    setStageData={setStageData}
                    setStageVisibility={setStageVisibility}
                    categoryId={String(categoryId)}
                    item={item}
                    isShown={shownLevelKey === keyId}
                    isLevelLocked={isLevelLocked}
                    index={index}
                    meta={meta}
                    keyId={keyId}
                    stageVisibility={stageVisibility}
                    useUserProgressData={useUserProgressData}
                  />
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
