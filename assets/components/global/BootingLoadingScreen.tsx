import { devlabBootLines, devlabTips } from "@/constants";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const BootingLoadingScreen = () => {
  const [bootText, setBootText] = useState<string>(
    "Setting up the workplace..."
  );

  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    let i: number = 0;
    //random quote
    const iden = Math.floor(Math.random() * devlabTips.length);
    setQuote(devlabTips[iden]);

    const interval = setInterval(() => {
      if (i < devlabBootLines.length) {
        setBootText(devlabBootLines[i]);
        i = (i + 1) % devlabBootLines.length;
      } else {
        clearInterval(interval);
        return i;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <View className="flex-[1] bg-background justify-center items-center">
      <View className="flex-[1] justify-center items-center">
        <LottieView
          source={require("@/assets/Lottie/Loading.json")}
          autoPlay
          style={{ width: "50%", aspectRatio: 1 }}
        />
        <LottieView
          source={require("@/assets/Lottie/loadingSmall.json")}
          style={{ width: "10%", aspectRatio: 1 }}
          autoPlay
        />
        <Text className="text-white font-exoBold text-center xs:text-xs">
          {bootText}
        </Text>
        <Text className="text-white font-exoLight text-center px-7 mt-14  xs:text-xs">
          {quote}
        </Text>
      </View>
    </View>
  );
};

export default BootingLoadingScreen;
