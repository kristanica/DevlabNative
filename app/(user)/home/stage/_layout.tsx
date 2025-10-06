import userHp from "@/assets/zustand/userHp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

import React, { useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const queryClient = new QueryClient();
const StageLayout = () => {
  const loadUserHp = userHp((state) => state.loadUserHp);
  useEffect(() => {
    loadUserHp();
  }, [loadUserHp]);
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1, position: "relative" }}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "none",
            }}
          />
        </View>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default StageLayout;
