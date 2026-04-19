import RenderCounter from "@/assets/components/global/RenderCounter";
import Footer from "@/assets/components/screen/INDEX/Footer";

import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";

const index = () => {
  RenderCounter("index");

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
