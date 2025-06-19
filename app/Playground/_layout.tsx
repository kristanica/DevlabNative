import { AuthProvider } from "@/assets/Provider/AuthProvider";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const PlaygroundLayout = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
};

export default PlaygroundLayout;

const styles = StyleSheet.create({});
