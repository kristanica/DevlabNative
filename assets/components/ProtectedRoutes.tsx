import { Redirect } from "expo-router";
import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { useAuth } from "./AuthChecker";

type childrenProps = {
  children: ReactNode;
};

const ProtectedRoutes: React.FC<childrenProps> = ({ children }) => {
  const { user, loaded } = useAuth();

  console.log("Auth loaded:", loaded, "User:", user);

  if (!loaded) {
    return (
      <View className="bg-red-300 flex-1">
        <Text className="text-black text-3xl">Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/" />;
  }

  if (user && loaded) {
    return <View className="flex-1">{children}</View>;
  }
};

export default ProtectedRoutes;
