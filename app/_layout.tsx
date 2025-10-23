import CustomToast from "@/assets/components/global/CustomToast";
import useCustomFonts from "@/assets/Hooks/useCustomFonts";
import { Protected } from "@/assets/zustand/Authentication";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { configureReanimatedLogger } from "react-native-reanimated";
import "../global.css";
const queryClient = new QueryClient();
configureReanimatedLogger({
  strict: false,
});

export default function RootLayout() {
  const readyFont = useCustomFonts();
  // const [networkState, setNetworkState] = useState({
  //   isConnected: true,
  //   isInternetReachable: true,
  //   type: "unknown",
  // });

  // useEffect(() => {
  //   console.log("HMM?");
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     const isOffline = !(state.isConnected && state.isInternetReachable);

  //     setNetworkState({
  //       isConnected: state.isConnected ?? false,
  //       isInternetReachable: state.isInternetReachable ?? false,
  //       type: state.type,
  //     });
  //     if (isOffline) {
  //       Alert.alert(
  //         "No Internet Connection",
  //         "Please check your internet connection and try again."
  //       );
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);
  const getValidUser = Protected((state) => state.getValidUser);
  const loaded = Protected((state) => state.loaded); // ✅ Get loaded state

  useEffect(() => {
    let unsub: any;
    const getValid = async () => {
      unsub = await getValidUser();
    };
    getValid();
    return () => unsub?.();
  }, [getValidUser]);

  if (!readyFont || !loaded) return null;

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
