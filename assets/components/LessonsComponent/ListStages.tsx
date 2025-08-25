import { db } from "@/assets/constants/constants";
import tracker from "@/assets/zustand/tracker";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useRef } from "react";
import { FlatList, Pressable, View } from "react-native";
import AdminLessonContainer from "../AdminComponents/AdminLessonContainer";
type StageDataProps = {
  id: string;
  title: string;
  description: string;
  type: "lesson" | "game";
  isHidden?: boolean;
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
        const queryByOrder = query(stagesRef, orderBy("order"));
        const stagesDocs = await getDocs(queryByOrder);
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
