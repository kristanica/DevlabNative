import useModal from "@/assets/Hooks/useModal";
import useSignOut from "@/assets/Hooks/useSignOut";
import { useProfile } from "@/assets/zustand/ProfileProvider";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SignOutModal from "../SettingsComponents/SignOutModal";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const { profileVal } = useProfile();
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
            profileVal
              ? { uri: profileVal }
              : // Default val if profileVal is false
                require("@/assets/images/profile.png")
          } // your image
          style={{ width: 100, height: 100, borderRadius: 15 }}
        />
      </View>

      <TouchableOpacity onPress={() => props.navigation.navigate("(tabs)")}>
        <Text className="text-white font-exoBold text-sm pt-7">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="text-white font-exoBold text-lg pt-7"
        onPress={() => props.navigation.navigate("Settings")}
      >
        <Text className="text-white font-exoBold text-sm ">Settings</Text>
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
