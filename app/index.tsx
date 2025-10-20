import RenderCounter from "@/assets/components/global/RenderCounter";
import Footer from "@/assets/components/screen/INDEX/Footer";
import { auth } from "@/assets/constants/constants";

import { router } from "expo-router";
import { signOut } from "firebase/auth";
import LottieView from "lottie-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const index = () => {
  RenderCounter("index");
  const handleLogin = async () => {
    const currentuser = auth.currentUser;
    if (currentuser) {
      console.log("There is a current user!");
      await signOut(auth);
    }
    router.replace({ pathname: "/Login" });
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
        <TouchableOpacity
          onPress={() =>
            router.replace({
              pathname: "/offline/OfflineScreen",
            })
          }
        >
          <Text className="text-white">Offline</Text>
        </TouchableOpacity>
        <Footer handleLogin={handleLogin}></Footer>
      </View>
    </View>
  );
};

export default index;
