import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const queryClient = new QueryClient();
const stageLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{ headerShown: false, animation: "none" }}
        ></Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default stageLayout;

const styles = StyleSheet.create({});
