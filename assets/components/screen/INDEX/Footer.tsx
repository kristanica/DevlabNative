import { path } from "@/constants";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
type FooterPayload = {
  handleLogin: () => Promise<void>;
};
const Footer = ({ handleLogin }: FooterPayload) => {
  return (
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
        <Text className="font-exoRegular text-white xs:text-xs sm:text-sm md:text-xl lg:text-2xl xl:text-2xl">
          Already have an account?
        </Text>

        <TouchableOpacity onPress={handleLogin}>
          <Text className="text-pink-400 ml-3 font-exoRegular xs:text-xs sm:text-sm md:text-xl lg:text-2xl xl:text-2xl">
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() =>
          router.replace({
            pathname: "/offline/OfflineScreen",
          })
        }
      >
        <Text className="text-pink-400 mt-5 font-exoRegular xs:text-xs sm:text-sm md:text-xl lg:text-2xl xl:text-2xl">
          No connection?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({});
