import useCustomFonts from "@/assets/Hooks/useCustomFonts";
import { Protected } from "@/assets/zustand/Authentication";
import NetInfo from "@react-native-community/netinfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import CustomToast from "@/assets/components/global/CustomToast";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { configureReanimatedLogger } from "react-native-reanimated";
import "../global.css";
const queryClient = new QueryClient();
configureReanimatedLogger({
  strict: false,
});
function OfflineBanner() {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        width: "100%",
        backgroundColor: "red",
        padding: 8,
        zIndex: 999,
      }}
    >
      <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
        You are offline
      </Text>
    </View>
  );
}
export default function RootLayout() {
  const readyFont = useCustomFonts();
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Connection type:", state.type); // wifi, cellular, none, unknown
      console.log("Is connected?", state.isConnected);
      console.log("Is internet reachable?", state.isInternetReachable);
      setIsConnected(state.isConnected);
    });

    NetInfo.fetch().then((state) => setIsConnected(state.isConnected));
    console.log(isConnected);
    return () => unsubscribe();
  }, []);

  const getValidUser = Protected((state) => state.getValidUser);
  useEffect(() => {
    getValidUser();
  }, []);

  if (!readyFont) return null;

  if (!isConnected) {
    console.log("redirect");
    return <Redirect href="/offline/OfflineScreen" />;
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style="light" />
          <CustomToast />
          <Stack
            screenOptions={{ headerShown: false, animation: "none" }}
          ></Stack>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </>
  );
}
