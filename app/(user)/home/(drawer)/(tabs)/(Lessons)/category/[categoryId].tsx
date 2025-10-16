import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import RenderCounter from "@/assets/components/global/RenderCounter";
import SmallLoading from "@/assets/components/global/SmallLoading";
import ListStages from "@/assets/components/LessonsComponent/ListStages";
import LockLessonModal from "@/assets/components/LessonsComponent/LockLessonModal";
import { CategoryItem } from "@/assets/components/RenderItems/CategoryItem";
import CategoryHeader from "@/assets/components/screen/CATEGORY/CategoryHeader";
import { auth, lessonMetaData, URL } from "@/assets/constants/constants";
import fetchLesson from "@/assets/Hooks/query/fetchLesson";
import useModal from "@/assets/Hooks/useModal";
import { setCoinsandExp } from "@/assets/zustand/setCoinsandExp";
import tracker from "@/assets/zustand/tracker";
import { unlockedStages } from "@/assets/zustand/unlockedStages";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, SectionList, Text, View } from "react-native";
import { useShallow } from "zustand/react/shallow";

const CategoryScreen = () => {
  RenderCounter("categoryid");
  const { categoryId } = useLocalSearchParams();
  const { visibility, setVisibility, scaleStyle, closeModal } = useModal();
  const [stagesVisibility, setStagesVisibility] = useState<boolean>(false);

  const { setTracker, lastStageVisibility, setLastStageVisibility } = tracker(
    useShallow((state) => ({
      setTracker: state.setTracker,
      lastStageVisibility: state.lastStageVisibility,
      setLastStageVisibility: state.setLastStageVisibility,
    }))
  );
  const setCoinsAndExp = setCoinsandExp((state) => state.setCoinsAndExp);
  const id = categoryId as keyof typeof lessonMetaData;
  const meta = lessonMetaData[id];
  const setUnlockedStages = unlockedStages((state) => state.setUnlockedStages);

  const { fetchedLesson, isLoading } = fetchLesson(id);

  const {
    data: useUserProgressData,
    isLoading: progressLoading,
    refetch: refetchProgress,
    isRefetching: isRefetching,
  } = useQuery({
    queryKey: ["specificUserProgress", id],
    queryFn: async () => {
      const token = await auth.currentUser?.getIdToken(true);
      const response = await axios.get(`${URL}/fireBase/userProgres/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUnlockedStages(response.data.allStages);
      console.log(JSON.stringify(response.data.allStages) + `${id}`);
      return response.data;
    },

    enabled: !!id,
  });

  const stageVisibilility = useCallback(() => {
    setStagesVisibility(false);
    setLastStageVisibility(false);
  }, [setStagesVisibility, setLastStageVisibility]);

  const { renderItem } = CategoryItem(
    useUserProgressData,
    meta,
    setVisibility,
    setTracker,
    setCoinsAndExp,
    setStagesVisibility,
    id
  );

  const sections = useMemo(() => {
    return fetchedLesson
      ? fetchedLesson.map((lesson: any) => ({
          title: lesson.Lesson,
          data: lesson.levelsData.map((level: any) => ({
            ...level,
            levelId: level.id,
            lessonId: lesson.id,
          })),
        }))
      : [];
  }, [fetchedLesson]);

  useEffect(() => {
    refetchProgress();
  }, []);
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
        ) : (lastStageVisibility ? lastStageVisibility : stagesVisibility) ? (
          <>
            <Pressable onPress={stageVisibilility} className="ml-3">
              <Ionicons
                name="arrow-back-circle"
                size={30}
                color={"white "}
              ></Ionicons>
            </Pressable>
            <ListStages userStagesProgress={useUserProgressData?.allStages} />
          </>
        ) : (
          <SectionList
            sections={sections}
            stickySectionHeadersEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            renderSectionHeader={({ section }) => (
              <Text className="text-white text-2xl font-exoBold mx-3 my-5">
                Lesson {section.title}
              </Text>
            )}
          />
        )}
      </CustomGeneralContainer>
    </View>
  );
};

export default CategoryScreen;
