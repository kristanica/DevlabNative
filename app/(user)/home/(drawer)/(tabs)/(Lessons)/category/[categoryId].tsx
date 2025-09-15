import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import SmallLoading from "@/assets/components/global/SmallLoading";
import LessonContainer from "@/assets/components/LessonsComponent/LessonContainer";
import ListStages from "@/assets/components/LessonsComponent/ListStages";
import LockLessonModal from "@/assets/components/LessonsComponent/LockLessonModal";
import { lessonMetaData } from "@/assets/constants/constants";
import fetchLesson from "@/assets/Hooks/query/fetchLesson";

import useModal from "@/assets/Hooks/useModal";
import { setCoinsandExp } from "@/assets/zustand/setCoinsandExp";
import tracker from "@/assets/zustand/tracker";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { Image, Pressable, SectionList, Text, View } from "react-native";

const categoryScreen = () => {
  const { categoryId } = useLocalSearchParams();
  const { visibility, setVisibility, scaleStyle, closeModal } = useModal();

  const [stagesVisibility, setStagesVisibility] = useState<boolean>(false);

  const setTracker = tracker((state) => state.setTracker);
  const setCoinsAndExp = setCoinsandExp((state) => state.setCoinsAndExp);

  const id = categoryId as keyof typeof lessonMetaData;
  const meta = lessonMetaData[id];

  const { fetchedLesson, isLoading } = fetchLesson(id);

  const allLevels = useGetUserInfo((state) => state.allProgressLevels);

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
          onConfirm={() => closeModal()}
          visibility={visibility}
          scaleStyle={scaleStyle}
          closeModal={closeModal}
        ></LockLessonModal>
        {isLoading ? (
          <SmallLoading />
        ) : stagesVisibility ? (
          <>
            <Pressable
              onPress={() => setStagesVisibility(false)}
              className="ml-3"
            >
              <Ionicons
                name="arrow-back-circle"
                size={30}
                color={"white "}
              ></Ionicons>
            </Pressable>
            <ListStages />
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
              const key = `${item.lessonId}-${item.levelId}`;
              const isLockedLesson = !allLevels[id]?.[key];
              return (
                <Pressable
                  onPress={() => {
                    if (isLockedLesson) {
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
                    isLocked={isLockedLesson}
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
