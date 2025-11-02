import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import ExperienceBar from "../../HomeComponents/ExperienceBar";

const ProfileHeader = ({ userData }: any) => {
  return (
    <View className="flex-[2] py-3">
      <ImageBackground
        source={
          userData?.backgroundImage
            ? { uri: userData.backgroundImage }
            : require("@/assets/images/default-background.jpg")
        }
        className="flex-row flex-1 border-b-[2px] border-gray-500 rounded-b-3xl overflow-hidden p-3"
      >
        {/* Left side */}
        <View className="flex-[2] justify-center items-center">
          <Image
            source={
              userData?.profileImage
                ? { uri: userData.profileImage }
                : require("@/assets/images/profile.png")
            }
            className="w-28 h-28 rounded-full border-2 border-white"
          />
          <Text className="text-white xs:text-xs font-exoLight mt-2 text-center">
            {userData?.bio}
          </Text>
        </View>

        {/* Right side */}
        <View className="flex-[3] justify-center pl-4">
          <Text className="text-white font-exoBold xs:text-xl">
            Good to see you!
          </Text>
          <Text className="text-white xs:text-lg font-exoExtraBold mt-1">
            {userData?.username}
          </Text>

          <View className="mt-3">
            <ExperienceBar
              userExp={userData?.exp || 0}
              userLevel={userData?.userLevel || 1}
              treshold={100}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default React.memo(ProfileHeader);

const styles = StyleSheet.create({});
