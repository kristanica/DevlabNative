import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import deleteLevel from "../../../API/fireBase/admin/level/deleteLevel";
import editLevel from "../../../API/fireBase/admin/level/editLevel";
import getLevelData from "../../../API/fireBase/admin/level/getLevelData";
import tracker from "../../../zustand/tracker";
type levelDataType = {
  title: string;
  description: string;
  coinsReward: number;
  expReward: number;
};
const useLevelEditor = () => {
  const payload = tracker((state) => state.levelPayload);
  const queryClient = useQueryClient();
  const { data: levelData } = useQuery({
    queryKey: [
      "specificLevelData",
      payload?.category,
      payload?.lessonId,
      payload?.levelId,
    ],
    queryFn: async () => {
      return await getLevelData({
        category: String(payload?.category),
        lessonId: String(payload?.lessonId),
        levelId: String(payload?.levelId),
      });
    },
  });

  const updateLevelMutation = useMutation({
    mutationFn: async ({ state }: { state: any }) => {
      await editLevel({
        category: String(payload?.category),
        lessonId: String(payload?.lessonId),
        levelId: String(payload?.levelId),
        state,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lesson admin", payload?.category],
      });
    },
  });
  const deleteLevelMutation = useMutation({
    mutationFn: async () => {
      await deleteLevel({
        category: String(payload?.category),
        lessonId: String(payload?.lessonId),
        levelId: String(payload?.levelId),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lesson admin", payload?.category],
      });
    },
  });
  return { levelData, updateLevelMutation, deleteLevelMutation };
};
export default useLevelEditor;
