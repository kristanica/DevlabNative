import fetchLessonForUser from "@/assets/API/fireBase/user/fetchLessonForUser";
import { useQuery } from "@tanstack/react-query";

const fetchLesson = (category: string) => {
  const { data: fetchedLesson, isLoading } = useQuery({
    queryKey: ["userLesson", category],
    queryFn: async () => fetchLessonForUser(category),
  });

  return { fetchedLesson, isLoading };
};
export default fetchLesson;
