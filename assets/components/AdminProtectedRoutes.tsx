import { Redirect } from "expo-router";
import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import adminAuthentication from "../zustand/adminAuthentication";
import LoadingAnim from "./LoadingAnim";

type AdminProtectedRoutesProps = {
  children: ReactNode;
};

const AdminProtectedRoutes = ({ children }: AdminProtectedRoutesProps) => {
  const user = adminAuthentication((state) => state.user);
  const loaded = adminAuthentication((state) => state.loaded);

  if (!loaded) {
    return (
      <View className="flex-[1] bg-background justify-center items-center">
        <LoadingAnim />
      </View>
    );
  }

  // if not admin, redirect back
  if (!user) return <Redirect href="/(user)/home/Settings" />;

  // If user is logged in and loaded, render children
  if (user && loaded) return <View className="flex-1">{children}</View>;
  return null;
};

export default AdminProtectedRoutes;

const styles = StyleSheet.create({});
