import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

import CustomTabBar from "@/assets/components/TabBarComponents/CustomTabBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const _layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tabs.Screen name="Home" />
        <Tabs.Screen name="Shop" />
        <Tabs.Screen name="Settings" />
        <Tabs.Screen name="(Lessons)" options={{ title: "Lessons" }} />
        <Tabs.Screen name="Achievements" options={{ title: "Trophies" }} />
      </Tabs>
    </QueryClientProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
