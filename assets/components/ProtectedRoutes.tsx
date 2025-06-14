import { Redirect } from "expo-router";
import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { useAuth } from "../Provider/AuthProvider";

type childrenProps = {
  children: ReactNode;
};

const ProtectedRoutes = ({ children }: childrenProps) => {
  // useAuth Context
  const { user, loaded } = useAuth();

  // If still loading
  if (!loaded) {
    return (
      <View className="bg-red-300 flex-1">
        <Text className="text-black text-3xl">Loading...</Text>
      </View>
    );
  }
  // If thre is no user, redirect to index (login)
  if (!user) {
    return <Redirect href="/" />;
  }
  // If user is login and loaded, will render
  if (user && loaded) {
    return <View className="flex-1">{children}</View>;
  }
};

export default ProtectedRoutes;
