import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const contentManagementLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "none" }}></Stack>
  );
};

export default contentManagementLayout;

const styles = StyleSheet.create({});
