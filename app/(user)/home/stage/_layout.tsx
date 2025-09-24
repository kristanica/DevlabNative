import userHp from "@/assets/zustand/userHp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const queryClient = new QueryClient();
const stageLayout = () => {
  const loadUserHp = userHp((state) => state.loadUserHp);
  useEffect(() => {
    loadUserHp();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "none",
          }}
        ></Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default stageLayout;
