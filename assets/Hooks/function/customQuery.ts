import { useQuery, UseQueryResult } from "@tanstack/react-query";

const customQuery = <Data>(
  key: string[],
  fn: () => Promise<Data>
): UseQueryResult<Data> => {
  return useQuery({
    queryKey: key,
    queryFn: fn,
  });
};

export default customQuery;
