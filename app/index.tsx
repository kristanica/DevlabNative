import RenderCounter from "@/assets/components/global/RenderCounter";
import Footer from "@/assets/components/screen/INDEX/Footer";
import { auth } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";
import { signOut } from "firebase/auth";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { View } from "react-native";

const index = () => {
  RenderCounter("index");

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const currentuser = auth.currentUser;
        const val = await AsyncStorage.getItem("isLoggin");
        if (val === "false" && currentuser) {
          await signOut(auth);
          return;
        }
        if (val === "true" && currentuser) {
          router.replace("/home/Home");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkLogin();
  }, []);

  return (
    <View className="bg-background flex-[1] justify-center items-center ">
      <View className="flex-[1] ">
        <View className="flex-[2] justify-center items-center">
          <LottieView
            source={require("@/assets/Lottie/Loading.json")}
            autoPlay
            loop={true}
            style={{ width: "100%", aspectRatio: 1 }}
          ></LottieView>
          {/* <Image
            source={require("@/assets/images/devlabIcon.png")}
            style={{ width: "100%", height: 500 }}
          ></Image> */}
        </View>

        <Footer
          handleLogin={async () => router.replace({ pathname: "/Login" })}
        ></Footer>
      </View>
    </View>
  );
};

export default index;
