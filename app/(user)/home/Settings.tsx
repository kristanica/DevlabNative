import AdminModal from "@/assets/components/SettingsComponents/AdminModal";

import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import ButtonAnimated from "@/assets/components/ButtonComponent";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import useModal from "@/assets/Hooks/useModal";
import usePickImage from "@/assets/Hooks/usePickImage";
import { useBackground } from "@/assets/zustand/BackgroundProvider";
import { useProfile } from "@/assets/zustand/ProfileProvider";
import React, { useState } from "react";

import ConfirmationModal from "@/assets/components/SettingsComponents/ConfirmationModal";
import SignOutModal from "@/assets/components/SettingsComponents/SignOutModal";

import useKeyBoardHandler from "@/assets/Hooks/useKeyBoardHandler";
import useSignOut from "@/assets/Hooks/useSignOut";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { router } from "expo-router";
import {
  Image,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated from "react-native-reanimated";

const Settings = () => {
  const [bio, setBio] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const { backgroundVal } = useBackground();
  const { profileVal } = useProfile();
  const logOutModal = useModal();
  const adminModal = useModal();
  const confirmationModal = useModal();
  const { userData } = useGetUserInfo();
  const { pickImageProfile, pickImageBackground } = usePickImage();
  const { logOut } = useSignOut();

  const { keyBoardHandlingStyle } = useKeyBoardHandler();
  return (
    <ProtectedRoutes>
      <View className="bg-accent flex-1">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <Animated.View className="flex-1" style={[keyBoardHandlingStyle]}>
              <View className="flex-[1] justify-center items-center">
                <Pressable onPress={pickImageProfile}>
                  {profileVal ? (
                    <Image
                      source={{ uri: profileVal }}
                      className="rounded-full w-[20px] flex-[1]"
                    />
                  ) : (
                    <Image
                      source={require("@/assets/images/profile.png")}
                      className="rounded-full  xs:w-32 xs:h-32  sm:w-20 sm:h-20 md:w-24 md:h-24"
                    />
                  )}
                </Pressable>
              </View>

              <View className=" bg-shopAccent flex-[3] m-3 rounded-2xl">
                <Pressable className="" onPress={pickImageBackground}>
                  {backgroundVal ? (
                    <ImageBackground
                      className=" rounded-2xl overflow-hidden rounded-br-none rounded-bl-none xs:h-[100px]"
                      source={{ uri: backgroundVal }}
                    ></ImageBackground>
                  ) : (
                    <ImageBackground
                      className=" rounded-2xl overflow-hidden rounded-br-none rounded-bl-none xs:h-20"
                      source={require("@/assets/images/profile.png")}
                    ></ImageBackground>
                  )}
                </Pressable>

                <View className=" items-center justify-center">
                  <Text className="text-white text-center text-2xl font-exoBold xs:text-sm">
                    UPDATE PROFILE INFORMATION
                  </Text>
                </View>

                <View className="my-3">
                  <View>
                    <Text className="text-white mx-5 mb-2 xs:text-xs font-exoBold">
                      Username
                    </Text>
                    <View className="flex-row bg-[#1E212F] mx-5 rounded-[10px]">
                      <TextInput
                        value={userName}
                        onChangeText={setUserName}
                        // placeholder={"username"}
                        placeholder={userData?.username}
                        className="text-[#ffffff9e] bg-[#1E212F] flex-[1] xs:text-xs"
                      />
                    </View>
                  </View>

                  <View className="mt-3">
                    <Text className="text-white mx-5 mb-2 xs:text-xs font-exoBold">
                      Bio
                    </Text>

                    <View className="flex-row bg-[#1E212F] mx-5">
                      <TextInput
                        value={bio}
                        onChangeText={setBio}
                        placeholder={userData?.bio}
                        className="text-[#ffffff9e] bg-[#1E212F] flex-[1] xs:text-xs"
                      />
                    </View>
                  </View>
                </View>

                <View className=" items-center pt-10   ">
                  <Pressable
                    onPress={() => {
                      Keyboard.dismiss;
                      if (!userName.trim() && !bio.trim()) {
                        alert("Empty credentials");
                        return;
                      }
                      confirmationModal.setVisibility(true);
                    }}
                  >
                    <Text className="text-white py-2 px-7 font-exoBold rounded-2xl bg-green-400  xs: text-xs">
                      Save Changes
                    </Text>
                  </Pressable>

                  <Pressable onPress={() => logOutModal.setVisibility(true)}>
                    <Text className="text-white py-2 px-12 rounded-2xl font-exoBold my-3 bg-red-600 xs: text-xs">
                      Log out
                    </Text>
                  </Pressable>

                  <ButtonAnimated
                    backgroundColor="transparent"
                    onPressAction={() => adminModal.setVisibility(true)}
                  >
                    <Text className="text-white py-2 font-exoLight xs:text-xs">
                      Login as Administrator
                    </Text>
                  </ButtonAnimated>
                </View>
              </View>
            </Animated.View>
            {adminModal.visibility && (
              <AdminModal
                onConfirm={() => {
                  router.replace({ pathname: "/(admin)/AdminLogin" });
                }}
                visibility={adminModal.visibility}
                scaleStyle={adminModal.scaleStyle}
                closeModal={adminModal.closeModal}
              />
            )}
            {logOutModal.visibility && (
              <SignOutModal
                onConfirm={logOut}
                visibility={logOutModal.visibility}
                scaleStyle={logOutModal.scaleStyle}
                closeModal={logOutModal.closeModal}
              />
            )}

            {confirmationModal.visibility && (
              <ConfirmationModal
                userName={userName}
                bio={bio}
                visibility={confirmationModal.visibility}
                scaleStyle={confirmationModal.scaleStyle}
                closeModal={confirmationModal.closeModal}
              />
            )}
          </CustomGeneralContainer>
        </AnimatedViewContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default Settings;

const styles = StyleSheet.create({});
