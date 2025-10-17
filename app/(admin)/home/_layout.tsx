import { fetchUsers } from "@/assets/API/fireBase/admin/userManagement/fetchUsers";
import { activeLevelCounter } from "@/assets/API/fireBase/user/activeLevelCounter";
import BootingLoadingScreen from "@/assets/components/global/BootingLoadingScreen";
import CustomTabBarAdmin from "@/assets/components/TabBarComponents/CustomTabBarAdmin";
import { adminIcon } from "@/assets/constants/constants";
import adminAuthentication from "@/assets/zustand/adminAuthentication";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";

const query = new QueryClient();
const AdminLayout = () => {
  const getValidAdmin = adminAuthentication((state) => state.getAdmin);
  const [isReady, setIsReady] = useState<boolean>(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const loadProgress = async () => {
      const result = await Promise.allSettled([
        queryClient.ensureQueryData({
          queryKey: ["Active level admin"],
          queryFn: activeLevelCounter,
          staleTime: 5 * 60 * 1000,
        }),
        queryClient.ensureQueryData({
          queryKey: ["allUser"],
          queryFn: fetchUsers,
          staleTime: 5 * 60 * 1000,
        }),

        getValidAdmin(),
      ]);
      result.forEach(async (error, index) => {
        if (error.status === "rejected")
          console.log(`Query ${index} failed because of ${error.reason}`);
        return;
      });

      const isAllFulfiled = result.every((item) => item.status === "fulfilled");

      if (isAllFulfiled) {
        setIsReady(true);
      }
    };

    loadProgress();
  }, [getValidAdmin]);

  if (!isReady) {
    return (
      <>
        <BootingLoadingScreen></BootingLoadingScreen>
      </>
    );
  }
  return (
    <QueryClientProvider client={query}>
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CustomTabBarAdmin {...props} tabIcon={adminIcon} />}
      >
        <Tabs.Screen name="UserManagement"></Tabs.Screen>
        <Tabs.Screen
          name="(contentManagement)"
          options={{ title: "Content Management" }}
        ></Tabs.Screen>
      </Tabs>
    </QueryClientProvider>
  );
};

export default AdminLayout;
