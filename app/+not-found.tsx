import ButtonAnimated from "@/assets/components/ButtonComponent";
import { path } from "@/assets/constants/constants";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Text, View } from "react-native";

const notFound = () => {
  return (
    <View className="flex-1 bg-background justify-center items-center">
      <LottieView
        source={require("@/assets/Lottie/Sad Signout.json")}
        style={{ height: 200, width: 200 }}
      ></LottieView>
      <Text className="text-white font-exoBold my-7">
        Uhhh.... you're not supose to be here
      </Text>
      <ButtonAnimated
        onPressAction={() => router.replace({ pathname: path.INDEX })}
      >
        <Text className="bg-button px-7 py-2 rounded-2xl text-white font-exoBold">
          Back
        </Text>
      </ButtonAnimated>
    </View>
  );
};
export default notFound;
