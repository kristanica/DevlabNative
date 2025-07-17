import { devlabBootLines, devlabTips } from "@/assets/constants/constants";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import ProtectedRoutes from "../../assets/components/ProtectedRoutes";

const LoadingScreen = () => {
  const [bootText, setBootText] = useState<string>(
    "Setting up the workplace..."
  );
  const [counter, setCounter] = useState<number>(1);
  const [quote, setQuote] = useState<string>("");
  const [visible, setVisible] = useState(true);
  // Set boottext every 2sec
  useEffect(() => {
    const unsub1 = setTimeout(() => {
      setBootText(devlabBootLines[counter]);
      setCounter((prev) => (prev + 1) % devlabBootLines.length);
    }, 1000);

    return () => clearTimeout(unsub1);
  }, [counter]);

  // redirect to homepage after 15 sec
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        router.replace("/home/Home");
      }, 2500);
    }, 15000);

    return () => clearTimeout(timeoutId);
  }, []);

  //get random quote
  useEffect(() => {
    const iden = Math.floor(Math.random() * devlabTips.length);
    setQuote(devlabTips[iden]);
  }, []);

  return (
    <ProtectedRoutes>
      <View className="flex-[1] bg-background justify-center items-center">
        {visible && (
          <Animated.View
            entering={FadeIn.duration(1000)}
            exiting={FadeOut.duration(1000)}
            className="flex-[1] justify-center items-center"
          >
            <LottieView
              source={require("@/assets/Lottie/Loading.json")}
              style={{ height: 300, width: 300 }}
            />
            <LottieView
              source={require("@/assets/Lottie/loadingSmall.json")}
              style={{ height: 50, width: 300 }}
              autoPlay
            />
            <Text className="text-white font-exoBold text-center">
              {bootText}
            </Text>
            <Text className="text-white font-exoBold text-center px-7 mt-14">
              {quote}
            </Text>
          </Animated.View>
        )}
      </View>
    </ProtectedRoutes>
  );
};

export default LoadingScreen;
