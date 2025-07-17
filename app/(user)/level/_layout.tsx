import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
const queryClient = new QueryClient();
const levelLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
    </QueryClientProvider>
  );
};
export default levelLayout;
