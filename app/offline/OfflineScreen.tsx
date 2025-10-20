import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

const OfflineScreen = () => {
  return (
    <View className="flex-1 bg-background">
      <CustomGeneralContainer>
        <View className="flex-1 justify-center items-center">
          <LottieView
            source={require("@/assets/Lottie/Loading.json")}
            autoPlay
            loop
            style={{ width: "100%", aspectRatio: 1.5 }}
          ></LottieView>
          <Text className="text-white font-exoBold text-center text-[12px] px-5">
            Whoops! seems like {"you're"} offline. But dont worry! you can still
            access some of the functions that devlab offers.
          </Text>

          <View className=" flex-row w-[100%] justify-evenly mt-8">
            <Pressable
              onPress={() =>
                router.push({ pathname: "/offline/OfflineCodeEditor" })
              }
            >
              <Text className="bg-button px-7 py-2 rounded-xl text-white text-xs xs:text-[10px]">
                Code Editor
              </Text>
            </Pressable>
            <Pressable
              onPress={() =>
                router.push({ pathname: "/offline/OfflineDatabaseCodeEditor" })
              }
            >
              <Text className="text-white px-7 py-2 rounded-xl bg-button text-xs xs:text-[10px]">
                Database Editor
              </Text>
            </Pressable>
          </View>
        </View>
      </CustomGeneralContainer>
    </View>
  );
};

export default OfflineScreen;
