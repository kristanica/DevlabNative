import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import ExperienceBar from "../../HomeComponents/ExperienceBar";

const ProfileHeader = ({ userData }: any) => {
  return (
    <View className="flex-[2] py-3 ">
      <ImageBackground
        source={
          userData?.backgroundImage
            ? { uri: userData?.backgroundImage }
            : require("@/assets/images/profile.png")
        }
        className="flex-row flex-[1]  overflow-hidden border-[#adb2be]  border-b-[2px]"
      >
        {/* Renders left side user information */}
        <View className="flex-[2]  justify-center items-center">
          {userData?.profileImage && (
            <Image
              // profileVal context usage
              source={
                userData?.profileImage
                  ? { uri: userData?.profileImage }
                  : // Default val if profileVal is false
                    require("@/assets/images/profile.png")
              }
              className=" rounded-full xs:w-28 xs:h-28 "
            />
          )}

          <Text className="xs:text-xs text-white font-exoLight">
            {userData?.bio}
          </Text>
        </View>

        {/* Renders right side user information */}
        <View className="flex-[3] justify-center items-star ">
          <Text className="text-white font-exoBold xs:text-xl">
            Good to see you!
          </Text>
          <Text className="text-white xs:text-lg font-exoExtraBold">
            {userData?.username}
          </Text>

          <ExperienceBar
            userExp={userData!.exp!}
            userLevel={userData!.userLevel}
            treshold={100}
          ></ExperienceBar>
        </View>
      </ImageBackground>
    </View>
  );
};

export default React.memo(ProfileHeader);

const styles = StyleSheet.create({});
