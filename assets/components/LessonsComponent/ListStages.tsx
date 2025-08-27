import { db } from "@/assets/constants/constants";
import tracker from "@/assets/zustand/tracker";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useRef } from "react";
import { FlatList, Pressable, View } from "react-native";
import AdminLessonContainer from "../AdminComponents/AdminLessonContainer";

type StageForNavigation = {
  id: string;
  order: number;
  codingInterface?: string;
  description: string;
  instruction: string;
  title: string | undefined | null;
};
const ListStages = () => {
  const levelPayload = tracker((state) => state.levelPayload);

  const stageId = useRef<string>("");

  const { data: levelsData } = useQuery({
    queryKey: [
      "Stages",
      levelPayload?.category,
      levelPayload?.lessonId,
      levelPayload?.levelId,
    ],
    queryFn: async () => {
      if (!levelPayload) {
        return null;
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
        const queryByOrder = query(stagesRef, orderBy("order"));
        const stagesDocs = await getDocs(queryByOrder);

        return stagesDocs.docs.map((doc) => {
          return {
            id: doc.id,
            ...(doc.data() as {
              isHidden: boolean;
              order: number;
              codingInterface?: string;
              description: string;
              instruction: string;
              title: string | undefined | null;
            }),
          };
        });
      } catch (error) {
        return null;
      }
    },
    enabled: !!(
      levelPayload?.category &&
      levelPayload?.lessonId &&
      levelPayload?.levelId
    ),
  });
  let globalCounter = 0;
  return (
    <View className="flex-[1]">
      <FlatList
        data={levelsData ?? []}
        showsVerticalScrollIndicator
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          globalCounter++;

          return (
            <Pressable
              onPress={() => {
                stageId.current = item.id;
                if (
                  levelPayload?.category &&
                  levelPayload?.lessonId &&
                  levelPayload?.levelId &&
                  stageId
                ) {
                  router.push({
                    pathname: "/(user)/home/(Lessons)/category/stage/[stageId]",
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
              {item.isHidden ? null : (
                <AdminLessonContainer
                  item={item}
                  index={globalCounter}
                ></AdminLessonContainer>
              )}
            </Pressable>
          );
        }}
      ></FlatList>
    </View>
  );
};

export default ListStages;
