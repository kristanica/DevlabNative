import AdminLessonContainer from "@/assets/components/AdminComponents/AdminLessonContainer";
import EditStageModal from "@/assets/components/AdminComponents/EditStageModal";
import AdminProtectedRoutes from "@/assets/components/AdminProtectedRoutes";
import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import { db } from "@/assets/constants/constants";
import useModal from "@/assets/Hooks/useModal";
import tracker from "@/assets/zustand/tracker";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
type StageDataProps = {
  id: string;
  title: string;
  description: string;
  type: "lesson" | "game";
  isHidden?: boolean;
};
const Stage = () => {
  const levelPayload = tracker((state) => state.levelPayload);
  const stageTracker = tracker((state) => state.setStage);
  console.log(levelPayload);
  const { data: levelsData, refetch } = useQuery({
    queryKey: [
      "Stages",
      levelPayload?.category,
      levelPayload?.lessonId,
      levelPayload?.levelId,
    ],
    queryFn: async () => {
      if (!levelPayload) {
        return;
      }
      try {
        const stagesRef = collection(
          db,
          levelPayload.category,
          levelPayload.lessonId,
          "Levels",
          levelPayload.levelId,
          "Stages"
        );

        const stagesDocs = await getDocs(stagesRef);
        const stagesData: StageDataProps[] = stagesDocs.docs.map((doc) => {
          return {
            id: doc.id,
            ...(doc.data() as Omit<StageDataProps, "id">),
          };
        });

        return stagesData;
      } catch (error) {}
    },
    enabled: !!(
      levelPayload?.category &&
      levelPayload?.lessonId &&
      levelPayload?.levelId
    ),
  });

  const { visibility, setVisibility, scaleStyle, closeModal } = useModal();
  return (
    <AdminProtectedRoutes>
      <View className="flex-[1] bg-accent">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <TouchableOpacity onPress={() => router.back()}>
              <Text>Back</Text>
            </TouchableOpacity>
            <Text className="text-white font-exoBold font-lg m-auto">
              Currently viewing {levelPayload?.lessonId} {levelPayload?.levelId}
            </Text>

            <Text className="text-white font-exoRegular py-2 px-7 text-center">
              The following are the stages for {levelPayload?.lessonId}{" "}
              {levelPayload?.levelId}, press one of the following to edit them.
              Note that Games are hidden to users
            </Text>
            <FlatList
              data={levelsData}
              showsVerticalScrollIndicator
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      stageTracker(item.id);
                      setVisibility(true);
                    }}
                  >
                    <AdminLessonContainer
                      item={item}
                      index={index}
                    ></AdminLessonContainer>
                  </TouchableOpacity>
                </>
              )}
            ></FlatList>
            {visibility && (
              <EditStageModal
                visibility={visibility}
                scaleStyle={scaleStyle}
                closeModal={closeModal}
              ></EditStageModal>
            )}
          </CustomGeneralContainer>
        </AnimatedViewContainer>
      </View>
    </AdminProtectedRoutes>
  );
};

export default Stage;

const styles = StyleSheet.create({});
