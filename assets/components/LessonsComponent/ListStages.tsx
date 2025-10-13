import { auth, URL } from "@/assets/constants/constants";
import { setLastOpenedLevel } from "@/assets/Hooks/query/mutation/setLastOpenedLevel";
import useModal from "@/assets/Hooks/useModal";
import stageStore from "@/assets/zustand/stageStore";
import tracker from "@/assets/zustand/tracker";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import SmallLoading from "../global/SmallLoading";
import ListStagesItem from "../RenderItems/ListStagesItem";
import LockLessonModal from "./LockLessonModal";

const ListStages = ({ userStagesProgress }: any) => {
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
      const res = await fetch(
        `${URL}/fireBase/getSpecificStage/${levelPayload?.category}/${levelPayload?.lessonId}/${levelPayload?.levelId}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        console.log("Failed to fetch stages... " + res.status);
        return null;
      }
      const data = await res.json();

      setStageData(data);
      return data;
    },
  });
  let globalCounter = 0;

  if (!levelPayload) {
    return null;
  }

  const lockedModal = useModal();

  const lastOpenedLevel = setLastOpenedLevel();

  useEffect(() => {
    if (!levelsData) return;
    lastOpenedLevel.mutate({
      lessonId: levelPayload.lessonId,
      levelId: levelPayload.levelId,
      category: levelPayload.category,
    });
  }, [levelsData]);

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
        <FlashList
          data={levelsData ?? []}
          estimatedItemSize={98}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: any) => item.id}
          renderItem={renderItem}
        ></FlashList>
      )}

      <LockLessonModal
        onConfirm={() => lockedModal.closeModal()}
        {...lockedModal}
      ></LockLessonModal>
    </View>
  );
};

export default ListStages;
