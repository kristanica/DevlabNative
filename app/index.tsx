import ButtonComponent from "@/assets/components/ButtonComponent";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const index = () => {
  return (
    <View className="bg-background flex-[1] justify-center items-center">
      <Animated.View
        entering={FadeIn.duration(500)}
        exiting={FadeOut.duration(100)}
      >
        <View className="flex-[2] justify-center items-center">
          <LottieView
            source={require("@/assets/Lottie/Loading.json")}
            autoPlay
            loop
            style={{ width: 400, height: 400 }}
          ></LottieView>
        </View>

        <View className="flex-[1] justify-center items-center">
          <Text className="text-white text-4xl font-exoBold">🖥️ DEVLAB</Text>
          <Text className="text-white text-xl my-2 text-justify font-exoMedium">
            Where gamification meets web development
          </Text>
          <View className="mb-3">
            <ButtonComponent
              onPressAction={() => router.replace("/OnBoarding")}
            >
              <Text className="font-exoBold text-white bg-button text-xl px-16 py-5 rounded-2xl">
                Proceed
              </Text>
            </ButtonComponent>
          </View>
          <View className="flex-row">
            <Text className="font-exoRegular text-white">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.replace("/Login")}>
              <Text className="text-pink-400 ml-3 font-exoRegular">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default index;
