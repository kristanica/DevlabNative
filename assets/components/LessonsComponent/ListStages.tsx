import { auth, URL } from "@/assets/constants/constants";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import useModal from "@/assets/Hooks/useModal";
import stageStore from "@/assets/zustand/stageStore";
import tracker from "@/assets/zustand/tracker";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef } from "react";
import { Text, View } from "react-native";
import RenderCounter from "../global/RenderCounter";
import SmallLoading from "../global/SmallLoading";
import ListStagesItem from "../RenderItems/ListStagesItem";
import LockLessonModal from "./LockLessonModal";

const ListStages = ({ userStagesProgress }: any) => {
  RenderCounter("List Stages");
  const levelPayload = tracker((state) => state.levelPayload);

  const setStageData = stageStore((state) => state.setstageData);
  const stageId = useRef<string>("");
  const setLastStageVisibility = tracker(
    (state) => state.setLastStageVisibility
  );
  const { data: levelsData, isLoading } = useQuery({
    queryKey: [
      "Stages",
      levelPayload?.category,
      levelPayload?.lessonId,
      levelPayload?.levelId,
    ],
    queryFn: async () => {
      const currentUser = auth.currentUser;
      const token = await currentUser?.getIdToken(true);
      const [res, error] = await tryCatch(
        axios.get(
          `${URL}/fireBase/getSpecificStage/${levelPayload?.category}/${levelPayload?.lessonId}/${levelPayload?.levelId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      );

      if (error) {
        console.log(error);
        return;
      }
      const data = res?.data;

      setStageData(data);
      return data;
    },
  });
  let globalCounter = 0;

  if (!levelPayload) {
    return null;
  }

  const lockedModal = useModal();

  const { renderItem } = ListStagesItem(
    levelPayload,
    levelsData,
    userStagesProgress,
    globalCounter,
    setLastStageVisibility,
    lockedModal,
    stageId
  );
  return (
    <View className="h-[40%]">
      {isLoading ? (
        <SmallLoading />
      ) : (
        <>
          <Text>ASDSAD</Text>
          <FlashList
            data={levelsData}
            estimatedItemSize={98}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: any) => item.id}
            renderItem={renderItem}
          ></FlashList>
        </>
      )}

      <LockLessonModal
        onConfirm={() => lockedModal.closeModal()}
        {...lockedModal}
      ></LockLessonModal>
    </View>
  );
};

export default ListStages;
