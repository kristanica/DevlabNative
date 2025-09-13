import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
type LoadingScreen = {
  progress: number;
};
const LoadingCompression = ({ progress }: LoadingScreen) => {
  return (
    <View
      className="absolute inset-0 justify-center items-center bg-black/40 z-50"
      style={[StyleSheet.absoluteFillObject]}
    >
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
        <Progress.Circle
          style={{ margin: "auto" }}
          size={50}
          progress={progress}
          showsText={true}
          thickness={6}
          color="#6c37a5"
        />
      </View>
    </View>
  );
};

export default LoadingCompression;

const styles = StyleSheet.create({});
