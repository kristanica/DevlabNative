import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const LoadingScreen = () => {
  return (
    <View className="absolute inset-0 justify-center items-center bg-black/40 z-50">
      <View className="w-[50%] h-[30%] bg-modal p-3 border-[#6c37a5] border-[1px] rounded-xl">
        <LottieView
          source={require("@/assets/Lottie/Loading.json")}
          autoPlay
          loop
          style={{ width: "100%", aspectRatio: 1 }}
        ></LottieView>
        <Text className="text-white font-exoBold text-xs mx-auto text-center ">
          Your new profile is being updated. Please wait.
        </Text>
      </View>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
