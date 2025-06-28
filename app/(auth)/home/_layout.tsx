import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

import CustomTabBar from "@/assets/components/TabBarComponents/CustomTabBar";

const _layout = () => {
  return (
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
  );
};

export default _layout;

const styles = StyleSheet.create({});
