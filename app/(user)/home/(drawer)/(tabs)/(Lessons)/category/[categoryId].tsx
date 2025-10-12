import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import SmallLoading from "@/assets/components/global/SmallLoading";
import LessonContainer from "@/assets/components/LessonsComponent/LessonContainer";
import ListStages from "@/assets/components/LessonsComponent/ListStages";
import LockLessonModal from "@/assets/components/LessonsComponent/LockLessonModal";
import { auth, lessonMetaData, URL } from "@/assets/constants/constants";
import fetchLesson from "@/assets/Hooks/query/fetchLesson";

import useModal from "@/assets/Hooks/useModal";
import { setCoinsandExp } from "@/assets/zustand/setCoinsandExp";
import tracker from "@/assets/zustand/tracker";
import { unlockedStages } from "@/assets/zustand/unlockedStages";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { Image, Pressable, SectionList, Text, View } from "react-native";

const CategoryScreen = () => {
  const { categoryId } = useLocalSearchParams();
  const { visibility, setVisibility, scaleStyle, closeModal } = useModal();
  const [stagesVisibility, setStagesVisibility] = useState<boolean>(false);

  const setTracker = tracker((state) => state.setTracker);
  const lastStageVisibility = tracker((state) => state.lastStageVisibility);
  const setLastStageVisibility = tracker(
    (state) => state.setLastStageVisibility
  );
  const setCoinsAndExp = setCoinsandExp((state) => state.setCoinsAndExp);
  const id = categoryId as keyof typeof lessonMetaData;
  const meta = lessonMetaData[id];
  const setUnlockedStages = unlockedStages((state) => state.setUnlockedStages);
  const { fetchedLesson, isLoading } = fetchLesson(id);
  let globalCounter = 0;

  const { data: useUserProgressData, isLoading: progressLoading } = useQuery({
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

  return (
    <View className="bg-accent flex-[1]">
      <CustomGeneralContainer>
        <LinearGradient
          colors={[meta.gradient.color1, meta.gradient.color2]}
          locations={[0.1, 0.8]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={{ height: "25%", flexDirection: "row" }}
        >
          <View className="flex-[1] justify-center items-center ml-3">
            <Text className="text-white shadow text-xl text-justify font-exoBold">
              {meta.title}
            </Text>
            <Text className="text-white shadow font-exoLight text-xs xs:text-[8px] text-justify">
              {meta.description}
            </Text>
          </View>
          <View className="flex-[.5] justify-center items-center">
            <Image source={meta.icon} className="w-[100px] h-[100px]"></Image>
          </View>
        </LinearGradient>

        <View className=" items-center mx-3">
          <Text className="my-5  text-white text-2xl xs:text-xl font-exoBold">
            About
            <Text style={{ color: meta.gradient.color1 }}>
              {id.toUpperCase().toString()}
            </Text>
          </Text>

          <Text className="text-white  font-exoRegular text-justify my-2 text-xs xs: text-[10px]">
            {meta.about}
          </Text>
        </View>
        <LockLessonModal
          onConfirm={() => closeModal()}
          visibility={visibility}
          scaleStyle={scaleStyle}
          closeModal={closeModal}
        ></LockLessonModal>
        {isLoading || progressLoading ? (
          <SmallLoading />
        ) : (lastStageVisibility ? lastStageVisibility : stagesVisibility) ? (
          <>
            <Pressable
              onPress={() => {
                setStagesVisibility(false);
                setLastStageVisibility(false);
              }}
              className="ml-3"
            >
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
            sections={
              fetchedLesson
                ? fetchedLesson.map((lesson: any) => ({
                    title: lesson.Lesson, // numeric lesson index
                    data: lesson.levelsData.map((level: any) => ({
                      ...level,
                      levelId: level.id,
                      lessonId: lesson.id,
                    })),
                  }))
                : []
            }
            stickySectionHeadersEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              globalCounter++;
              const key = `${item.lessonId}-${item.levelId}`; // Access data directly from query

              const isLevelLocked =
                useUserProgressData?.allProgress?.[key]?.isActive ?? false;

              return (
                <Pressable
                  onPress={() => {
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
                  }}
                >
                  <LessonContainer
                    isLocked={!isLevelLocked}
                    levelInformation={item}
                    index={globalCounter}
                    icon={
                      meta.ionIcon as
                        | "cube"
                        | "logo-javascript"
                        | "logo-html5"
                        | "logo-css3"
                    }
                  ></LessonContainer>
                </Pressable>
              );
            }}
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
