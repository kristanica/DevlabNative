import ButtonComponent from "@/assets/components/ButtonComponent";
import { fontFamily } from "@/fontFamily/fontFamily";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
          <Text
            className="text-white text-4xl"
            style={{ fontFamily: fontFamily.ExoBold }}
          >
            🖥️ DEVLAB
          </Text>
          <Text
            className="text-white text-xl my-2 text-justify"
            style={{ fontFamily: fontFamily.ExoMedium }}
          >
            Where gamification meets web development
          </Text>
          <View className="mb-3">
            <ButtonComponent
              onPressAction={() => router.replace("/OnBoarding")}
            >
              <Text
                className="text-white bg-button text-xl px-16 py-5 rounded-2xl"
                style={{ fontFamily: fontFamily.ExoBold }}
              >
                Proceed
              </Text>
            </ButtonComponent>
          </View>
          <View className="flex-row">
            <Text
              className="text-white"
              style={{ fontFamily: fontFamily.ExoRegular }}
            >
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.replace("/Login")}>
              <Text
                className="text-pink-400 ml-3"
                style={{ fontFamily: fontFamily.ExoRegular }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
