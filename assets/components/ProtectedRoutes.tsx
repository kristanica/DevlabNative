import { Redirect } from "expo-router";
import React, { ReactNode } from "react";
import { View } from "react-native";
import { Protected } from "../zustand/Authentication";
import LoadingAnim from "./LoadingAnim";

type childrenProps = {
  children: ReactNode;
};

const ProtectedRoutes = ({ children }: childrenProps) => {
  const user = Protected((state) => state.user);
  const loaded = Protected((state) => state.loaded);

  if (!loaded) {
    return (
      <View className="flex-[1] bg-background justify-center items-center">
        <LoadingAnim />
      </View>
    );
  }

  // If there is no user, redirect to index (login)
  if (!user) return <Redirect href="/" />;

  // If user is logged in and loaded, render children
  if (user && loaded) return <View className="flex-1">{children}</View>;
  return null;
};

export default ProtectedRoutes;
