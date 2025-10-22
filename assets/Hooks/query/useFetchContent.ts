import { fetchContent } from "@/assets/API/fireBase/user/fetchContent";
import { useQuery } from "@tanstack/react-query";

export const useFetchContent = (category: string) => {
  return useQuery({
    queryKey: ["getAllData", category],
    queryFn: () => fetchContent(category),
  });
};
