import { auth, db, URL } from "@/assets/constants/constants";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import useModal from "@/assets/Hooks/useModal";
import stageStore from "@/assets/zustand/stageStore";
import tracker from "@/assets/zustand/tracker";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useRef } from "react";
import { FlatList, Pressable, View } from "react-native";
import SmallLoading from "../global/SmallLoading";
import LockLessonModal from "./LockLessonModal";
import StagesContainer from "./StagesContainer";

const ListStages = () => {
  const levelPayload = tracker((state) => state.levelPayload);
  const setStageData = stageStore((state) => state.setstageData);
  console.log(levelPayload);
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
  const lockedModal = useModal();

  const lastOpenedLevel = useMutation({
    mutationFn: async () => {
      const uid = auth.currentUser?.uid;
      const userRef = doc(db, "Users", String(uid));

      const [_, error] = await tryCatch(
        setDoc(
          userRef,
          {
            lastOpenedLevel: {
              lessonId: levelPayload.lessonId,
              levelId: levelPayload.levelId,
              subject: levelPayload.category,
            },
          },
          { merge: true }
        )
      );

      if (error) {
        console.log(error);
        return;
      }
    },
  });

  useEffect(() => {
    lastOpenedLevel.mutate();
  }, []);
  return (
    <View className="h-[40%]">
      {isLoading ? (
        <SmallLoading />
      ) : (
        <FlatList
          data={levelsData ?? []}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => {
            if (!item || !item.id) {
              console.warn("Null or invalid item in levelsData");
              return null;
            }
            const stageKey = `${levelPayload?.lessonId}-${levelPayload?.levelId}-${item.id}`;
            const isStageLocked =
              (allStages?.[levelPayload?.category]?.[stageKey]?.isActive &&
                allStages?.[levelPayload.category]?.[stageKey]?.isCompleted) ??
              false;
            console.log(isStageLocked);
            globalCounter++;
            if (item.type !== "Lesson") {
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
                  stageInformation={item}
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
