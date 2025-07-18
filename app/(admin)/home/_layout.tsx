import CustomTabBar from "@/assets/components/TabBarComponents/CustomTabBar";
import { adminIcon } from "@/assets/constants/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import React from "react";

const query = new QueryClient();
const AdminLayout = () => {
  return (
    <QueryClientProvider client={query}>
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CustomTabBar {...props} tabIcon={adminIcon} />}
      ></Tabs>
    </QueryClientProvider>
  );
};

export default AdminLayout;
