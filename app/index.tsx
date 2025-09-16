import AnimatedAppearContainer from "@/assets/components/AnimatedAppearContainer";
import { auth, path, URL } from "@/assets/constants/constants";
import useNavigate from "@/assets/Hooks/useNavigate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

const index = () => {
  const opacityVal = useSharedValue(0);
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Render Test</title>
  <style>
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #ff6ec4, #7873f5);
      font-family: Arial, sans-serif;
    }
    .card {
      background: white;
      border-radius: 16px;
      padding: 30px;
      text-align: center;
      box-shadow: 0 8px 16px rgba(0,0,0,0.25);
    }
    .card h1 {
      margin: 0;
      font-size: 2rem;
      color: #333;
    }
    .card p {
      margin: 10px 0 0;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello, DevLab!</h1>
    <p>This was rendered with Puppeteer 🎉</p>
  </div>
</body>
</html>
`;
  const mutate = useMutation({
    mutationFn: async () => {
      const token = await auth.currentUser?.getIdToken(true);
      const res = await axios.post(
        `${URL}/test`,
        {
          html,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      const screenshotUri = `data:image/png;base64,${res.data.screenshot}`;
      return res.data;
    },
  });

  return (
    <View className="bg-background flex-[1] justify-center items-center ">
      <AnimatedAppearContainer opacityVal={opacityVal}>
        <View className="flex-[1] ">
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
            <Pressable onPress={() => mutate.mutate()}>
              <Text className="text-white  xs:text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-2xl xs:text-center  my-2 font-exoMedium">
                Where gamification meets web development
              </Text>
            </Pressable>
            {mutate.data && (
              <Image
                source={{ uri: mutate.data.screenshot }}
                style={{ width: 300, height: 300, resizeMode: "contain" }}
              ></Image>
            )}
            <Pressable onPress={() => router.replace(path.ONBOARDING)}>
              <Text className="font-exoBold my-2 xs:text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-2xl text-white bg-button px-7 py-2 rounded-2xl self-start">
                Proceed
              </Text>
            </Pressable>
            <Image></Image>
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
        </View>
      </AnimatedAppearContainer>
    </View>
  );
};

export default index;
