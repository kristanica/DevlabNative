import { db } from "@/assets/constants/constants";
import tracker from "@/assets/zustand/tracker";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { FlatList, View } from "react-native";
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
            <>
              <AdminLessonContainer
                item={item}
                index={globalCounter}
              ></AdminLessonContainer>
            </>
          );
        }}
      ></FlatList>
    </View>
  );
};

export default ListStages;
