import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet } from "react-native";

type splashProps = {
  onEnd: () => void;
};
const Splash = ({ onEnd }: splashProps) => {
  return (
    <LottieView
      source={require("@/assets/Lottie/SplashScreen.json")}
      autoPlay
      loop={false}
      resizeMode="cover"
      onAnimationFinish={onEnd}
      style={{ height: "100%", width: "100%", backgroundColor: "#0D1117" }}
    />
  );
};

export default Splash;
// Styles for the shadow effect
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0,
  },
});
