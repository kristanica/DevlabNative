import { auth, path } from "@/assets/constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";
import { signOut } from "firebase/auth";
import LottieView from "lottie-react-native";
import React from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

const index = () => {
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       router.replace({ pathname: "/home/Home" });
  //       console.log("User logged in:", user.uid);
  //     } else {
  //       // No persisted session
  //       console.log("User logged out");
  //     }
  //   });

  //   return unsubscribe;
  // }, []);
  return (
    <View className="bg-background flex-[1] justify-center items-center ">
      <View className="flex-[1] ">
        <View className="flex-[2] justify-center items-center">
          <LottieView
            source={require("@/assets/Lottie/Loading.json")}
            autoPlay
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
          <Image></Image>
          <View className="flex-row">
            <TouchableOpacity
              onPress={async () => {
                try {
                  await AsyncStorage.clear();
                  await signOut(auth);
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

            <TouchableOpacity
              onPress={async () => {
                const currentuser = auth.currentUser;
                if (currentuser) {
                  console.log("There is a current user!");
                  await signOut(auth);
                }

                router.replace({ pathname: "/Login" });
              }}
            >
              <Text className="text-pink-400 ml-3 font-exoRegular xs:text-xs sm:text-sm md:text-xl lg:text-2xl xl:text-2xl">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default index;
