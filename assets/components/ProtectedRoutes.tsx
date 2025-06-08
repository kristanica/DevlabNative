import { Redirect } from "expo-router";
import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { useAuth } from "./AuthChecker";

type childrenProps = {
  children: ReactNode;
};

const ProtectedRoutes: React.FC<childrenProps> = ({ children }) => {
  const { user, loaded } = useAuth();

  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text className="text-black text-3xl">Hello</Text>
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/" />;
  }

  if (user && loaded) {
    return <View className="flex-1"> {children}</View>;
  }
};

export default ProtectedRoutes;
