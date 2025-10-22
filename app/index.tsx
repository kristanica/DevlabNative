import RenderCounter from "@/assets/components/global/RenderCounter";
import Footer from "@/assets/components/screen/INDEX/Footer";
import { auth } from "@/assets/constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";

const index = () => {
  RenderCounter("index");
  const handleLogin = async () => {
    try {
      const currentuser = auth.currentUser;
      const val = await AsyncStorage.getItem("isLoggin");
      if (val === "true" && currentuser) {
        router.replace("/home/Home");
      } else {
        router.replace({ pathname: "/Login" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="bg-background flex-[1] justify-center items-center ">
      <View className="flex-[1] ">
        <View className="flex-[2] justify-center items-center">
          <LottieView
            source={require("@/assets/Lottie/devlab-lottie-final.json")}
            autoPlay
            loop={false}
            style={{ width: "100%", aspectRatio: 1 }}
          ></LottieView>
        </View>
        <View className="absolute"></View>

        <Footer handleLogin={handleLogin}></Footer>
      </View>
    </View>
  );
};

export default index;
