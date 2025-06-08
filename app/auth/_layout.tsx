import { AuthChecker } from "@/assets/components/AuthChecker";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const AuthLayout = () => {
  return (
    <AuthChecker>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthChecker>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
