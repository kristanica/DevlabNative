import { fontFamily } from "@/fontFamily/fontFamily";
import { Redirect } from "expo-router";
import LottieView from "lottie-react-native";
import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
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
      <View className="flex-[1] bg-background justify-center items-center">
        <Animated.View
          entering={FadeIn.duration(1000)}
          className="justify-center items-center"
        >
          <LottieView
            source={require("@/assets/Lottie/Loading.json")}
            style={{ height: 200, width: 200 }}
          />

          <Text
            className="text-white"
            style={{ fontFamily: fontFamily.ExoBold }}
          >
            Hang out tight
          </Text>
        </Animated.View>
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
