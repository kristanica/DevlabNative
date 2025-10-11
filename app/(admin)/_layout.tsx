import FillScreenLoading from "@/assets/components/global/FillScreenLoading";
import {
  QueryClient,
  QueryClientProvider,
  useIsMutating,
} from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
const query = new QueryClient();
const AdminRootLayout = () => {
  const isMutating = useIsMutating();
  return (
    <>
      <QueryClientProvider client={query}>
        {isMutating > 0 && <FillScreenLoading></FillScreenLoading>}

        <Stack screenOptions={{ headerShown: false, animation: "none" }} />
      </QueryClientProvider>
    </>
  );
};

export default AdminRootLayout;
