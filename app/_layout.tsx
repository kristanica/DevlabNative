import useCustomFonts from "@/assets/Hooks/useCustomFonts";
import { AuthProvider } from "@/assets/Provider/AuthProvider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "../global.css";
export default function RootLayout() {
  const readyFont = useCustomFonts();

  if (!readyFont) return null;

  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
    </AuthProvider>
  );
}
