import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Logo = () => {
  return (
    <View className="flex-col justify-center items-center ">
      <LottieView
        source={require("@/assets/Lottie/devlab-lottie-final.json")}
        autoPlay
        loop={false}
        style={{ height: 50, width: 50, marginRight: 4 }}
      ></LottieView>
      <Text className="color-white  flex justify-center items-center mb-5 text-3xl font-[500] font-exoExtraBold ">
        DEVLAB
      </Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({});
