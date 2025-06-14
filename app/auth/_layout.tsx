import { AuthProvider } from "@/assets/Provider/AuthProvider";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
