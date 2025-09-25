import userHp from "@/assets/zustand/userHp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
const queryClient = new QueryClient();
const stageLayout = () => {
  const loadUserHp = userHp((state) => state.loadUserHp);
  useEffect(() => {
    loadUserHp();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "none",
          }}
        ></Stack>
        <Toast
          config={{
            success: () => (
              <View className="h-[50px]  w-52 mx-2 z-50 bg-[#1ABC9C] border-[#ffffffaf] border-[2px] rounded-xl justify-center items-center absolute ">
                <Text className="text-white xs: text-xs font-exoExtraBold">
                  🎉 You got that right!
                </Text>
              </View>
            ),
            error: () => (
              <View className="h-[50px]  w-52 mx-2 z-50  bg-[#E63946] border-[#ffffffaf] border-[2px] rounded-xl justify-center items-center absolute">
                <Text className="text-white xs: text-xs font-exoExtraBold">
                  ⚠️ Oops! somethings wrong!
                </Text>
              </View>
            ),
            rewardClaimed: () => (
              <View className="h-[50px]  w-52 mx-2 z-50  bg-slate-500 border-[#ffffffaf] border-[2px] rounded-xl justify-center items-center absolute">
                <Text className="text-white xs: text-xs font-exoExtraBold">
                  You've already completed this level! No rewards would be made
                </Text>
              </View>
            ),
            previousButton: () => (
              <View className="h-[50px]  w-52 mx-2 z-50  bg-red-500 border-[#ffffffaf] border-[2px] rounded-xl justify-center items-center absolute">
                <Text className="text-white xs: text-xs font-exoExtraBold">
                  You cannot go back further!
                </Text>
              </View>
            ),
          }}
        />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default stageLayout;
