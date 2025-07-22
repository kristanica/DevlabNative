import AdminLessonContainer from "@/assets/components/AdminComponents/AdminLessonContainer";
import AdminProtectedRoutes from "@/assets/components/AdminProtectedRoutes";
import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import ButtonAnimated from "@/assets/components/ButtonComponent";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import LoadingAnim from "@/assets/components/LoadingAnim";
import { useFetchLessonList } from "@/assets/Hooks/query/useFetchLessonList";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { SectionList, Text, View } from "react-native";

const ContentManagement = () => {
  const [category, setCategory] = useState<string>("Html");

  const { data: lessonsData, isLoading } = useQuery({
    queryKey: ["lesson admin", category],
    queryFn: () => useFetchLessonList({ category: category }),
  });
  let globalCounter = 0;
  return (
    <AdminProtectedRoutes>
      <View className="flex-[1] bg-accent">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <View className=" items-center flex-row justify-between mx-4">
              <Text className="text-white font-exoExtraBold text-3xl">
                Content Management
              </Text>
              <ButtonAnimated>
                <Ionicons
                  name={"add"}
                  size={30}
                  color={"white"}
                  className="bg-[#4CAF50] p-1 rounded-xl "
                ></Ionicons>
              </ButtonAnimated>
            </View>

            <View className="flex-row justify-between px-7 border-[2px] border-white border-x-0 border-t-0 mt-7">
              <ButtonAnimated onPressAction={() => setCategory("Html")}>
                <Text className="text-white font-exoBold ">HTML</Text>
              </ButtonAnimated>
              <ButtonAnimated onPressAction={() => setCategory("Css")}>
                <Text className="text-white font-exoBold ">Css</Text>
              </ButtonAnimated>
              <ButtonAnimated onPressAction={() => setCategory("JavaScript")}>
                <Text className="text-white font-exoBold ">JavaScript</Text>
              </ButtonAnimated>
              <ButtonAnimated onPressAction={() => setCategory("Database")}>
                <Text className="text-white font-exoBold ">Database</Text>
              </ButtonAnimated>
            </View>

            {isLoading ? (
              <LoadingAnim />
            ) : (
              <SectionList
                sections={
                  lessonsData
                    ? lessonsData.map((data: any) => ({
                        title: data.title,
                        data: data.levels.map((level: any) => ({
                          ...level,
                          lessonid: data.id,
                        })),
                      }))
                    : []
                }
                stickySectionHeadersEnabled={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  globalCounter++;
                  return (
                    <AdminLessonContainer
                      item={item}
                      key={index}
                      index={globalCounter}
                    />
                  );
                }}
                renderSectionHeader={({ section }) => (
                  <Text className="text-white text-2xl font-exoBold mx-3 my-5">
                    {section.title}
                  </Text>
                )}
              />
            )}
          </CustomGeneralContainer>
        </AnimatedViewContainer>
      </View>
    </AdminProtectedRoutes>
  );
};

export default ContentManagement;
