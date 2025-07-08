import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import LessonContainer from "@/assets/components/LessonsComponent/LessonContainer";
import LockLessonModal from "@/assets/components/LessonsComponent/LockLessonModal";
import LoadingAnim from "@/assets/components/LoadingAnim";
import { lessonMetaData } from "@/assets/constants/constants";

import useFetchLessonList from "@/assets/Hooks/useFetchLessonList";
import useModal from "@/assets/Hooks/useModal";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React from "react";
import { Image, Pressable, SectionList, Text, View } from "react-native";

const categoryScreen = () => {
  const { categoryId } = useLocalSearchParams();
  const { visibility, setVisibility, scaleStyle, closeModal } = useModal();

  const id = categoryId as keyof typeof lessonMetaData;
  const meta = lessonMetaData[id];

  const { loading, lesson } = useFetchLessonList({ category: id });
  let globalAnim: number = 0;

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
        <View className=" items-center">
          <Text className="my-5 text-3xl text-white font-exoBold">
            About
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
        {loading ? (
          <LoadingAnim />
        ) : (
          <SectionList
            sections={lesson.map((data: any) => ({
              title: data.title,
              data: data.levels.map((level: any) => ({
                ...level,
                lessonid: data.id,
              })),
            }))}
            stickySectionHeadersEnabled={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => {
              globalAnim++;
              return (
                <Pressable
                  onPress={() => {
                    if (!item.status) {
                      setVisibility(true);
                    } else {
                      console.log(item);
                      router.replace({
                        pathname: "/level/[levelid]",
                        params: {
                          levelid: item.id,
                          title: id,
                          lessonid: item.lessonid,
                        },
                      });
                    }
                  }}
                >
                  <LessonContainer
                    item={item}
                    icon={
                      meta.ionIcon as
                        | "cube"
                        | "logo-javascript"
                        | "logo-html5"
                        | "logo-css3"
                    }
                    index={globalAnim}
                  />
                </Pressable>
              );
            }}
            renderSectionHeader={({ section }) => (
              <Text className="text-white text-2xl font-exoBold">
                {section.title}
              </Text>
            )}
          />
        )}
      </CustomGeneralContainer>
    </View>
  );
};

export default categoryScreen;
