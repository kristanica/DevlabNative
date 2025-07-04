import { fontFamily } from "@/fontFamily/fontFamily";
import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const LoadingAnim = () => {
  return (
    <Animated.View
      entering={FadeIn.duration(1000)}
      className="justify-center items-center"
    >
      <LottieView
        source={require("@/assets/Lottie/Loading.json")}
        style={{ height: 200, width: 200 }}
      />

      <Text className="text-white" style={{ fontFamily: fontFamily.ExoBold }}>
        Hang out tight
      </Text>
    </Animated.View>
  );
};

export default LoadingAnim;

const styles = StyleSheet.create({});
