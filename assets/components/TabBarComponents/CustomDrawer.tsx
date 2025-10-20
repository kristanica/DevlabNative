import useModal from "@/assets/Hooks/useModal";
import useSignOut from "@/assets/Hooks/useSignOut";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SignOutModal from "../SettingsComponents/SignOutModal";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const userData = useGetUserInfo((state) => state.userData);
  const { logOut } = useSignOut();
  const logOutModal = useModal();
  return (
    <DrawerContentScrollView
      bounces={false}
      style={{
        backgroundColor: "#0D1117",
        borderRightColor: "white",
        borderRightWidth: 0.5,
      }}
    >
      <View className="w-full border-b-[1px] border-white justify-center items-center  pb-5">
        <Image
          source={
            userData?.profileImage
              ? { uri: userData?.profileImage }
              : // Default val if profileVal is false
                require("@/assets/images/profile.png")
          } // your image
          style={{ width: 100, height: 100, borderRadius: 15 }}
        />
      </View>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("(tabs)")}
        className="flex-row items-center "
      >
        <Image
          source={require("@/assets/images/navBarIcons/Dashboard.png")}
          className="h-[20px] w-[20px] mt-5 mr-2 "
        ></Image>
        <Text className="text-white font-exoBold text-sm pt-7">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center "
        onPress={() => props.navigation.navigate("Settings")}
      >
        <Image
          source={require("@/assets/images/navBarIcons/settings.png")}
          className="h-[20px] w-[20px] mt-5 mr-2 "
        ></Image>

        <Text className="text-white font-exoBold text-sm pt-7">Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => logOutModal.setVisibility(true)}
        className="pt-7"
      >
        <Text className="bg-[#E63946] text-sm self-start mx-auto px-7 py-2 rounded-2xl text-white font-exoBold">
          Log out
        </Text>
      </TouchableOpacity>
      {logOutModal.visibility && (
        <SignOutModal
          onConfirm={logOut}
          visibility={logOutModal.visibility}
          scaleStyle={logOutModal.scaleStyle}
          closeModal={logOutModal.closeModal}
        />
      )}
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
