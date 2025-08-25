import AdminLessonContainer from "@/assets/components/AdminComponents/AdminLessonContainer";
import CategorySelector from "@/assets/components/AdminComponents/CategorySelector";
import DeleteFireBaseConfirmationModal from "@/assets/components/AdminComponents/DeleteFireBaseConfirmationModal";
import EditLessonModal from "@/assets/components/AdminComponents/EditLessonModal";
import SaveToFirebaseConfirmation from "@/assets/components/AdminComponents/SaveToFirebaseConfirmation";
import AdminProtectedRoutes from "@/assets/components/AdminProtectedRoutes";
import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import LoadingAnim from "@/assets/components/LoadingAnim";
import useLessonEditor from "@/assets/Hooks/useLessonEditor";
import useModal from "@/assets/Hooks/useModal";
import tracker from "@/assets/zustand/tracker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import { SectionList, Text, TouchableOpacity, View } from "react-native";

const ContentManagement = () => {
  const [category, setCategory] = useState<string>("Html");
  const [lessonId, setLessonId] = useState<string>("");
  const [lessonIdDeletion, setLessonIdDeletion] = useState<string>("");

  const setTracker = tracker((state) => state.setTracker);

  const {
    lessonsData,
    isLoading,
    addLevelMutation,
    addLessonMutation,
    deleteLessonMutation,
    refetch,
  } = useLessonEditor(category, lessonId, lessonIdDeletion);

  const editLevelModal = useModal();
  const deleteLessonModal = useModal();
  const addLevelModal = useModal();
  const addLessonModal = useModal();

  let globalCounter = 0;

  return (
    <AdminProtectedRoutes>
      <View className="flex-[1] bg-accent">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <View className=" items-center flex-row justify-between mx-4">
              <TouchableOpacity onPress={() => refetch()}>
                <Text className="text-white font-exoExtraBold text-3xl">
                  Content Management
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => addLessonModal.setVisibility(true)}
              >
                <Ionicons
                  name={"add"}
                  size={30}
                  color={"white"}
                  className="bg-[#4CAF50] p-1 rounded-xl "
                ></Ionicons>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between px-7 border-[2px] border-white border-x-0 border-t-0 mt-7">
              <CategorySelector setCategory={setCategory} />
            </View>

            {isLoading ? (
              <LoadingAnim></LoadingAnim>
            ) : (
              <SectionList
                sections={
                  lessonsData
                    ? lessonsData.map((data: any) => ({
                        title: data.Lesson,
                        data: data.levelsData.map((level: any) => ({
                          ...level,
                          lessonid: data.id,
                        })),
                      }))
                    : []
                }
                stickySectionHeadersEnabled={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index, section }) => {
                  globalCounter++;
                  return (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          setTracker({
                            category: category,
                            lessonId: item.lessonid,
                            levelId: item.id,
                          });
                          router.push({
                            pathname: "/(admin)/home/(contentManagement)/Stage",
                          });
                        }}
                        onLongPress={() => {
                          setTracker({
                            category: category,
                            lessonId: item.lessonid,
                            levelId: item.id,
                          });

                          editLevelModal.setVisibility(true);
                        }}
                      >
                        <AdminLessonContainer
                          item={item}
                          category={category}
                          key={index}
                          index={globalCounter}
                        />
                      </TouchableOpacity>

                      {index === section.data.length - 1 && (
                        <TouchableOpacity
                          onPress={() => {
                            setLessonId(item.lessonid);
                            addLevelModal.setVisibility(true);
                          }}
                        >
                          <Ionicons
                            name={"add"}
                            size={30}
                            color={"white"}
                            className="bg-[#4CAF50] p-1 rounded-xl self-start mx-auto mt-3"
                          ></Ionicons>
                        </TouchableOpacity>
                      )}
                    </>
                  );
                }}
                renderSectionHeader={({ section }) => (
                  <TouchableOpacity
                    onLongPress={() => {
                      setLessonIdDeletion(`Lesson${section.title}`);
                      console.log(`Lesson${section.title}`);
                      deleteLessonModal.setVisibility(true);
                    }}
                  >
                    <Text className="text-white text-2xl font-exoBold mx-3 my-5">
                      {"Lesson "}
                      {section.title}
                    </Text>
                  </TouchableOpacity>
                )}
              ></SectionList>
            )}
            {editLevelModal.visibility && (
              <EditLessonModal
                onConfirm={() => {}}
                {...editLevelModal}
              ></EditLessonModal>
            )}
            {deleteLessonModal.visibility && (
              <DeleteFireBaseConfirmationModal
                onConfirm={() => {
                  deleteLessonMutation.mutate();
                  deleteLessonModal.closeModal();
                }}
                {...deleteLessonModal}
              ></DeleteFireBaseConfirmationModal>
            )}
            {addLevelModal.visibility && (
              <SaveToFirebaseConfirmation
                onConfirm={() => {
                  addLevelMutation.mutate();
                  addLevelModal.closeModal();
                }}
                {...addLevelModal}
              ></SaveToFirebaseConfirmation>
            )}

            {addLessonModal.visibility && (
              <SaveToFirebaseConfirmation
                onConfirm={() => {
                  addLessonMutation.mutate();
                  addLessonModal.closeModal();
                }}
                {...addLessonModal}
              ></SaveToFirebaseConfirmation>
            )}
          </CustomGeneralContainer>
        </AnimatedViewContainer>
      </View>
    </AdminProtectedRoutes>
  );
};
export default ContentManagement;
