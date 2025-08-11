import adminAuthentication from "@/assets/zustand/adminAuthentication";
import { Stack } from "expo-router";
import React, { useEffect } from "react";

const AdminRootLayout = () => {
  const getValidAdmin = adminAuthentication((state) => state.getAdmin);
  useEffect(() => {
    getValidAdmin();
  }, [getValidAdmin]);
  return <Stack screenOptions={{ headerShown: false, animation: "none" }} />;
};

export default AdminRootLayout;
