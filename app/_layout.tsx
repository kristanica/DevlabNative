import useCustomFonts from "@/assets/Hooks/useCustomFonts";
import { Protected } from "@/assets/zustand/Authentication";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";
export default function RootLayout() {
  const readyFont = useCustomFonts();

  const getValidUser = Protected((state) => state.getValidUser);
  useEffect(() => {
    getValidUser();
  }, []);

  if (!readyFont) return null;
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false, animation: "none" }} />
      </GestureHandlerRootView>
    </>
  );
}
