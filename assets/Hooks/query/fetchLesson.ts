import fetchLessonForUser from "@/assets/API/fireBase/user/fetchLessonForUser";
import { useQuery } from "@tanstack/react-query";

const fetchLesson = (category: string) => {
  const { data: fetchedLesson, isLoading } = useQuery({
    queryKey: ["userLesson", category],
    queryFn: async () => fetchLessonForUser(category),
    staleTime: 5 * (60 * 1000), // remove if necessary
  });

  return { fetchedLesson, isLoading };
};
export default fetchLesson;
