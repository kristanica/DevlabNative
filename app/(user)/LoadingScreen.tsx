import {
  devlabBootLines,
  devlabTips,
  path,
} from "@/assets/constants/constants";
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

  const [quote, setQuote] = useState<string>("");
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let i: number = 0;
    //random quote
    const iden = Math.floor(Math.random() * devlabTips.length);
    setQuote(devlabTips[iden]);

    //imitates booting
    const interval = setInterval(() => {
      if (i < devlabBootLines.length) {
        setBootText(devlabBootLines[i]);
        return i++;
      } else {
        clearInterval(interval);
        return i;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // redirect to homepage after 15 sec
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        router.replace({ pathname: path.HOME });
      }, 2500);
    }, 4000);

    return () => clearTimeout(timeoutId);
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
