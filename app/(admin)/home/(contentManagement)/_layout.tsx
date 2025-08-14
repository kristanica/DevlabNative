import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const contentManagementLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false, animation: "none" }}></Stack>
    </GestureHandlerRootView>
  );
};

export default contentManagementLayout;

const styles = StyleSheet.create({});
