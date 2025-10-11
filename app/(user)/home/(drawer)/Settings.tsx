import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import useModal from "@/assets/Hooks/useModal";
import React, { useState } from "react";

import ConfirmationModal from "@/assets/components/SettingsComponents/ConfirmationModal";
import SignOutModal from "@/assets/components/SettingsComponents/SignOutModal";

import LoadingScreen from "@/assets/components/LoadingScreen";
import ResetPasswordModal from "@/assets/components/SettingsComponents/ResetPasswordModal";
import editUserInfo from "@/assets/Hooks/query/editUserInfo";
import { pickImage } from "@/assets/Hooks/query/mutation/pickImage";
import useKeyBoardHandler from "@/assets/Hooks/useKeyBoardHandler";
import useSignOut from "@/assets/Hooks/useSignOut";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { useHeaderHeight } from "@react-navigation/elements";
import { useMutation } from "@tanstack/react-query";
import {
  Image,
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated from "react-native-reanimated";

const Settings = () => {
  const mutation = useMutation({
    mutationFn: async ({ userName, bio }: { userName: string; bio: string }) =>
      await editUserInfo(userName, bio),
  });
  const headerHeight = useHeaderHeight();

  console.log("Header height:", headerHeight);
  const { mutate: updateImage, isPending } = pickImage();

  const logOutModal = useModal();
  // const adminModal = useModal();
  const confirmationModal = useModal();
  const { userData } = useGetUserInfo();
  const { logOut } = useSignOut();

  const resetPassword = useModal();
  const [bio, setBio] = useState<string>(userData?.username!);
  const [userName, setUserName] = useState<string>(userData?.bio!);
  const { keyBoardHandlingStyle } = useKeyBoardHandler();
  return (
    <ProtectedRoutes>
      <View className="bg-accent flex-1">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <Animated.View
              className="flex-1"
              style={[keyBoardHandlingStyle, { marginTop: headerHeight - 20 }]}
            >
              {isPending && <LoadingScreen></LoadingScreen>}
              <View className="flex-[1] justify-center items-center">
                <Pressable
                  onPress={() => {
                    updateImage({ type: "profile" });
                  }}
                >
                  {userData?.profileImage ? (
                    <Image
                      source={{ uri: userData?.profileImage }}
                      className="rounded-full xs:w-40 xs:h-40 "
                    />
                  ) : (
                    <Image
                      source={require("@/assets/images/profile.png")}
                      className="rounded-full  xs:w-32 aspect-[3/4] sm:w-20 sm:h-20 md:w-24 md:h-24"
                    />
                  )}
                </Pressable>
              </View>
              <View className=" bg-shopAccent flex-[4] m-3 rounded-2xl">
                <Pressable
                  className=""
                  onPress={() => updateImage({ type: "background" })}
                >
                  {userData?.backgroundImage ? (
                    <ImageBackground
                      className=" rounded-2xl overflow-hidden rounded-br-none rounded-bl-none xs:h-[100px]"
                      source={{ uri: userData?.backgroundImage }}
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
                        placeholder={userData?.username}
                        className="text-[#ffffff9e] bg-[#1E212F] flex-[1] xs:text-xs p-4 rounded-[10px]  "
                        placeholderTextColor="rgba(128, 128, 128, 0.5)"
                      />
                    </View>
                  </View>

                  <View className="mt-3">
                    <Text className="text-white mx-5 mb-2 xs:text-xs font-exoBold ">
                      Bio
                    </Text>

                    <View className="flex-row bg-[#1E212F] mx-5 rounded-[10px]">
                      <TextInput
                        value={bio}
                        onChangeText={setBio}
                        placeholder={userData?.bio}
                        className="text-[#ffffff9e] bg-[#1E212F] flex-[1] xs:text-xs p-4 rounded-[10px]  "
                        placeholderTextColor="rgba(128, 128, 128, 0.5)"
                      />
                    </View>
                  </View>
                </View>
                <Pressable
                  onPress={() => resetPassword.setVisibility((prev) => !prev)}
                >
                  <Text className="text-white text-center text-xs font-exoLight opacity-70">
                    Reset Password
                  </Text>
                </Pressable>
                <View className=" items-center pt-10   ">
                  <Pressable
                    onPress={() => {
                      // Keyboard.dismiss;
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

                  {/* <ButtonAnimated
                    backgroundColor="transparent"
                    onPressAction={() => adminModal.setVisibility(true)}
                  >
                    <Text className="text-white py-2 font-exoLight xs:text-xs">
                      Login as Administrator
                    </Text>
                  </ButtonAnimated> */}
                </View>
              </View>
            </Animated.View>
            {/* {adminModal.visibility && (
              <AdminModal
                onConfirm={() => {
                  router.replace({ pathname: "/(admin)/AdminLogin" });
                }}
                visibility={adminModal.visibility}
                scaleStyle={adminModal.scaleStyle}
                closeModal={adminModal.closeModal}
              />
            )} */}
            {logOutModal.visibility && (
              <SignOutModal
                onConfirm={logOut}
                visibility={logOutModal.visibility}
                scaleStyle={logOutModal.scaleStyle}
                closeModal={logOutModal.closeModal}
              />
            )}

            {resetPassword.visibility && (
              <ResetPasswordModal {...resetPassword}></ResetPasswordModal>
            )}

            {confirmationModal.visibility && (
              <ConfirmationModal
                onConfirm={() => {
                  // Keyboard.dismiss;
                  mutation.mutate({ userName, bio });
                  setBio("");
                  setUserName("");
                  confirmationModal.closeModal();
                }}
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
