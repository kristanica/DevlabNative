import { userProgress } from "@/assets/API/fireBase/user/fetchUserProgress";
import { fetchShopItems } from "@/assets/API/fireBase/user/shop/fetchShopItems";
import BootingLoadingScreen from "@/assets/components/global/BootingLoadingScreen";
import CustomDrawer from "@/assets/components/TabBarComponents/CustomDrawer";
import { loadSounds } from "@/assets/Hooks/function/soundHandler";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { DrawerActions } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const drawerLayout = () => {
  const userData = useGetUserInfo((state) => state.userData);
  const [isReady, setIsReady] = useState(false);
  const queryClient = useQueryClient();
  const getValidUser = useGetUserInfo((state) => state.getUser);
  const getUserAchivementProgress = useGetUserInfo(
    (state) => state.getUserAchievementProgress
  );

  //Prefetch
  useEffect(() => {
    const loadProgress = async () => {
      const result = await Promise.allSettled([
        queryClient.ensureQueryData({
          queryKey: ["userProgress"],
          queryFn: userProgress,
          staleTime: 5 * 60 * 1000,
        }),
        queryClient.ensureQueryData({
          queryKey: ["shopItems"],
          queryFn: fetchShopItems,
          staleTime: 10 * 60 * 1000,
        }),
        loadSounds(),
        getValidUser(),
        getUserAchivementProgress(),
      ]);
      result.forEach(async (error, index) => {
        if (error.status === "rejected")
          console.log(`Query ${index} failed because of ${error.reason}`);
        return;
      });

      const isAllFulfiled = result.every((item) => item.status === "fulfilled");

      if (isAllFulfiled) {
        setIsReady(true);
        console.log("Data loaded");
      }
    };
    loadProgress();
  }, []);

  if (!isReady) {
    return (
      <>
        <BootingLoadingScreen></BootingLoadingScreen>
      </>
    );
  }
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props}></CustomDrawer>}
      screenOptions={{
        headerTransparent: true,
        drawerActiveTintColor: "#4caf50",
        headerLeft: () => {
          const navigation = useNavigation();
          return (
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Image
                source={
                  userData?.profileImage
                    ? { uri: userData?.profileImage }
                    : // Default val if profileVal is false
                      require("@/assets/images/profile.png")
                } // your image
                style={{ width: 30, height: 30, borderRadius: 15 }}
              />
            </TouchableOpacity>
          );
        },
      }}
    >
      <Drawer.Screen name="(tabs)" options={{ title: "" }}></Drawer.Screen>
      <Drawer.Screen
        name="Settings"
        options={{
          title: "Settings",
          headerStyle: {
            backgroundColor: "#0D1117",
          },
          headerTintColor: "#FFFFFF",
        }}
      ></Drawer.Screen>
    </Drawer>
  );
};

export default drawerLayout;

const styles = StyleSheet.create({});
