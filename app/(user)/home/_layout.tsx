import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
const queryClient = new QueryClient();
const homeLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </QueryClientProvider>
  );
};

export default homeLayout;

const styles = StyleSheet.create({});
