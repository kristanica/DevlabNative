import CustomTabBarAdmin from "@/assets/components/TabBarComponents/CustomTabBarAdmin";
import { adminIcon } from "@/assets/constants/constants";
import adminAuthentication from "@/assets/zustand/adminAuthentication";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";

const query = new QueryClient();
const AdminLayout = () => {
  const getValidAdmin = adminAuthentication((state) => state.getAdmin);
  useEffect(() => {
    getValidAdmin();
  }, [getValidAdmin]);
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
