import AnimatedAppearContainer from "@/assets/components/AnimatedAppearContainer";
import { path } from "@/assets/constants/constants";
import useNavigate from "@/assets/Hooks/useNavigate";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import {
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
const index = () => {
  const opacityVal = useSharedValue(0);

  const { width, height } = Dimensions.get("window");
  console.log(width);
  console.log(height);
  useEffect(() => {
    const fetchPing = async () => {
      try {
        const response = await fetch(
          "https://af1103113cfa.ngrok-free.app/evaluate",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: "JOSEPPH,. do you know him?" }),
          }
        ); // replace with your server URL
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching ping:", error);
        console.log("Error fetching ping");
      }
    };

    fetchPing();
  }, []);
  return (
    <View className="bg-background flex-[1] justify-center items-center p-10">
      <AnimatedAppearContainer opacityVal={opacityVal}>
        <View className="flex-[2] justify-center items-center">
          <LottieView
            source={require("@/assets/Lottie/Loading.json")}
            autoPlay
            loop
            style={{ width: "100%", aspectRatio: 1 }}
          ></LottieView>
        </View>

        <View className="flex-[1] justify-center items-center ">
          <Text className="text-white  font-exoBold  xs:text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl">
            🖥️ DEVLAB
          </Text>
          <Text className="text-white  xs:text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-2xl xs:text-center  my-2 font-exoMedium">
            Where gamification meets web development
          </Text>

          <Pressable onPress={() => router.replace(path.ONBOARDING)}>
            <Text className="font-exoBold my-2 xs:text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-2xl text-white bg-button px-7 py-2 rounded-2xl self-start">
              Proceed
            </Text>
          </Pressable>

          <View className="flex-row">
            <TouchableOpacity
              onPress={async () => {
                try {
                  await AsyncStorage.clear();
                  console.log("AsyncStorage cleared!");
                } catch (e) {
                  console.error("Failed to clear AsyncStorage.", e);
                }
              }}
            >
              <Text className="font-exoRegular text-white xs:text-xs sm:text-sm md:text-xl lg:text-2xl xl:text-2xl">
                Already have an account?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => useNavigate(opacityVal)}>
              <Text className="text-pink-400 ml-3 font-exoRegular xs:text-xs sm:text-sm md:text-xl lg:text-2xl xl:text-2xl">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </AnimatedAppearContainer>
    </View>
  );
};

export default index;
