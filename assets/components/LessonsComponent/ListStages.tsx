import { auth, URL } from "@/assets/constants/constants";
import useModal from "@/assets/Hooks/useModal";
import stageStore from "@/assets/zustand/stageStore";
import tracker from "@/assets/zustand/tracker";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useRef } from "react";
import { FlatList, Pressable, View } from "react-native";
import SmallLoading from "../global/SmallLoading";
import LockLessonModal from "./LockLessonModal";
import StagesContainer from "./StagesContainer";

const ListStages = () => {
  const levelPayload = tracker((state) => state.levelPayload);
  const setStageData = stageStore((state) => state.setstageData);

  const stageId = useRef<string>("");

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

  const allStages = useGetUserInfo((state) => state.allProgressStages);
  console.log(allStages);

  const lockedModal = useModal();

  return (
    <View className="flex-[1]">
      {isLoading ? (
        <SmallLoading />
      ) : (
        <FlatList
          data={levelsData ?? []}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const stageKey = `${levelPayload?.lessonId}-${levelPayload?.levelId}-${item.id}`;
            const isStageLocked =
              allStages?.[levelPayload?.category]?.[stageKey]?.status ?? false;

            globalCounter++;
            if (item.isHidden) {
              return null;
            }

            return (
              <Pressable
                onPress={() => {
                  stageId.current = item.id;
                  if (!isStageLocked) {
                    lockedModal.setVisibility(true);
                    return null;
                  }
                  if (
                    levelPayload?.category &&
                    levelPayload?.lessonId &&
                    levelPayload?.levelId &&
                    stageId
                  ) {
                    router.push({
                      pathname: "/(user)/home/stage/[stageId]",
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
                  isLocked={isStageLocked}
                  item={item}
                  index={globalCounter}
                ></StagesContainer>
              </Pressable>
            );
          }}
        ></FlatList>
      )}

      <LockLessonModal
        onConfirm={() => lockedModal.closeModal()}
        {...lockedModal}
      ></LockLessonModal>
    </View>
  );
};

export default ListStages;
