import { auth } from "@/assets/constants/constants";
import useFetchLessonProgress from "@/assets/Hooks/query/useFetchLessonProgress";
import useModal from "@/assets/Hooks/useModal";
import stageStore from "@/assets/zustand/stageStore";
import tracker from "@/assets/zustand/tracker";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useRef } from "react";
import { FlatList, Pressable, View } from "react-native";
import LockLessonModal from "./LockLessonModal";
import StagesContainer from "./StagesContainer";

const ListStages = () => {
  const levelPayload = tracker((state) => state.levelPayload);
  const setStageData = stageStore((state) => state.setstageData);

  const stageId = useRef<string>("");

  const { data: levelsData } = useQuery({
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
        `https://19bd9b5e53e7.ngrok-free.app/fireBase/getSpecificStage/${levelPayload?.category}/${levelPayload?.lessonId}/${levelPayload?.levelId}`,
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

      setStageData(data); // stores in firebase for [stagid] usage reducing unecesarry api calls
      return data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!(
      levelPayload?.category &&
      levelPayload?.lessonId &&
      levelPayload?.levelId
    ),
  });
  let globalCounter = 0;
  if (!levelPayload) {
    return null;
  }

  const { lessonWithProgress } = useFetchLessonProgress(levelPayload?.category);

  const lockedModal = useModal();

  return (
    <View className="flex-[1]">
      <FlatList
        data={levelsData ?? []}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          globalCounter++;

          return (
            <Pressable
              onPress={() => {
                stageId.current = item.id;

                if (
                  !lessonWithProgress?.allStages?.[
                    `${levelPayload.lessonId}-${levelPayload.levelId}-${item.id}`
                  ]
                ) {
                  lockedModal.setVisibility(true);
                  return;
                }
                if (
                  levelPayload?.category &&
                  levelPayload?.lessonId &&
                  levelPayload?.levelId &&
                  stageId
                ) {
                  router.push({
                    pathname: "/home/category/stage/[stageId]",
                    params: {
                      stageId: stageId.current,
                      category: levelPayload.category,
                      lessonId: levelPayload.lessonId,
                      levelId: levelPayload.levelId,
                    },
                  });
                }
              }}
            >
              <StagesContainer
                isLocked={
                  lessonWithProgress?.allStages[
                    `${levelPayload.lessonId}-${levelPayload.levelId}-${item.id}`
                  ] ?? false
                }
                item={item}
                index={globalCounter}
              ></StagesContainer>
            </Pressable>
          );
        }}
      ></FlatList>
      <LockLessonModal
        onConfirm={() => lockedModal.closeModal()}
        {...lockedModal}
      ></LockLessonModal>
    </View>
  );
};

export default ListStages;
