import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import LessonContainer from "@/assets/components/LessonsComponent/LessonContainer";
import ListStages from "@/assets/components/LessonsComponent/ListStages";
import LockLessonModal from "@/assets/components/LessonsComponent/LockLessonModal";
import LoadingAnim from "@/assets/components/LoadingAnim";
import { lessonMetaData } from "@/assets/constants/constants";
import { useFetchLessonList } from "@/assets/Hooks/query/useFetchLessonList";

import useModal from "@/assets/Hooks/useModal";
import tracker from "@/assets/zustand/tracker";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { Image, Pressable, SectionList, Text, View } from "react-native";

const categoryScreen = () => {
  const { categoryId } = useLocalSearchParams();
  const { visibility, setVisibility, scaleStyle, closeModal } = useModal();

  const [stagesVisibility, setStagesVisibility] = useState<boolean>(false);

  const setTracker = tracker((state) => state.setTracker);
  const levelPayload = tracker((state) => state.levelPayload);

  const id = categoryId as keyof typeof lessonMetaData;
  const meta = lessonMetaData[id];

  const { data, isLoading } = useQuery({
    queryKey: ["lesson user", id],
    queryFn: ({ queryKey }) => {
      const [, categoryId] = queryKey as [string, keyof typeof lessonMetaData];
      return useFetchLessonList({ category: categoryId });
    },
  });
  let globalCounter = 0;
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
            <Text className="text-white shadow text-2xl text-justify font-exoBold">
              {meta.title}
            </Text>
            <Text className="text-white shadow font-exoBold">
              {meta.description}
            </Text>
          </View>
          <View className="flex-[.5] justify-center items-center">
            <Image source={meta.icon} className="w-[100px] h-[100px]"></Image>
          </View>
        </LinearGradient>

        <View className=" items-center mx-3">
          <Text className="my-5 text-3xl text-white font-exoBold">
            About {""}
            <Text style={{ color: meta.gradient.color1 }}>
              {id.toUpperCase().toString()}
            </Text>
          </Text>

          <Text className="text-white text-justify my-2">{meta.about}</Text>
        </View>
        <LockLessonModal
          visibility={visibility}
          scaleStyle={scaleStyle}
          closeModal={closeModal}
        ></LockLessonModal>
        {isLoading ? (
          <LoadingAnim />
        ) : stagesVisibility ? (
          <>
            <Pressable onPress={() => setStagesVisibility(false)}>
              <Text className="text-white text-3xl">BACK</Text>
            </Pressable>
            <ListStages />
          </>
        ) : (
          <SectionList
            sections={
              data
                ? data.map((data: any) => ({
                    title: data.Lesson,
                    data: data.levels.map((level: any) => ({
                      ...level,
                      lessonid: data.id,
                    })),
                  }))
                : []
            }
            stickySectionHeadersEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              globalCounter++;
              return (
                <Pressable
                  onPress={() => {
                    if (item.isLocked) {
                      setVisibility(true);
                    } else {
                      setTracker({
                        category: id,
                        lessonId: item.lessonid,
                        levelId: item.id,
                      });
                      setStagesVisibility(true);
                    }
                  }}
                >
                  <LessonContainer
                    item={item}
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

export default categoryScreen;
