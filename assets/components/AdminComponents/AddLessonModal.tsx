import { db } from "@/assets/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import React from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";

type StageDataProps = {
  id: string;
  title: string;
  description: string;
  type: "lesson" | "game";
  isHidden?: boolean;
};

import useModal from "@/assets/Hooks/useModal";
import tracker from "@/assets/zustand/tracker";
import AdminLessonContainer from "./AdminLessonContainer";
import EditStageModal from "./EditStageModal";

type AddLessonModalProps = {
  Vvisibility: boolean;
  SscaleStyle: AnimatedStyle<ViewStyle>;
  CcloseModal: () => void;
};
const AddLessonModal = ({
  Vvisibility,
  SscaleStyle,
  CcloseModal,
}: AddLessonModalProps) => {
  const { visibility, setVisibility, scaleStyle, closeModal } = useModal();
  const levelPayload = tracker((state) => state.levelPayload);
  const stageTracker = tracker((state) => state.setStage);

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
  return (
    <Modal visible={Vvisibility} transparent={true}>
      <Pressable
        className="flex-[1] justify-center items-center"
        onPress={CcloseModal}
      >
        <Pressable className="w-[90%] h-[80%] " onPress={() => {}}>
          <Animated.View
            className="  bg-accent  border-[2px] h-full border-[#56EBFF]"
            style={[SscaleStyle]}
          >
            <Text className="text-white font-exoBold font-lg m-auto">
              Currently viewing {levelPayload?.lessonId} {levelPayload?.levelId}
            </Text>

            <Text className="text-white font-exoRegular py-2 px-7 text-center">
              The following are the stages for {levelPayload?.lessonId}{" "}
              {levelPayload?.levelId}, press one of the following to edit them
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
              />
            )}
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default AddLessonModal;
