import { useHeaderHeight } from "@react-navigation/elements";
import { useIsMutating, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import FillScreenLoading from "@/assets/components/global/FillScreenLoading";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import ConfirmationModal from "@/assets/components/SettingsComponents/ConfirmationModal";
import ResetPasswordModal from "@/assets/components/SettingsComponents/ResetPasswordModal";
import SignOutModal from "@/assets/components/SettingsComponents/SignOutModal";

import editUserInfo from "@/assets/Hooks/query/editUserInfo";
import { pickImage } from "@/assets/Hooks/query/mutation/pickImage";
import useModal from "@/assets/Hooks/useModal";
import useSignOut from "@/assets/Hooks/useSignOut";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";

const Settings = () => {
  const headerHeight = useHeaderHeight();
  const mutation = useMutation({
    mutationFn: async ({ userName, bio }: { userName: string; bio: string }) =>
      await editUserInfo(userName, bio),
  });

  const { mutate: updateImage } = pickImage();
  const logOutModal = useModal();
  const confirmationModal = useModal();
  const resetPassword = useModal();
  const { logOut } = useSignOut();

  const zustandUserName = useGetUserInfo((state) => state.userData?.username);
  const zustandBio = useGetUserInfo((state) => state.userData?.bio);
  const zustandBackgroundImage = useGetUserInfo(
    (state) => state.userData?.backgroundImage
  );
  const zustandProfileImage = useGetUserInfo(
    (state) => state.userData?.profileImage
  );

  const [bio, setBio] = useState<string>(zustandBio || "");
  const [userName, setUserName] = useState<string>(zustandUserName || "");

  const isMutating = useIsMutating();

  return (
    <ProtectedRoutes>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={headerHeight + 10}
      >
        <View className="flex-1 bg-accent">
          <CustomGeneralContainer>
            <KeyboardAwareScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "flex-start",
                paddingBottom: 20,
              }}
              enableOnAndroid={true}
              keyboardShouldPersistTaps="handled"
              extraScrollHeight={headerHeight + 20}
              enableAutomaticScroll={true}
            >
              {isMutating > 0 && (
                <FillScreenLoading text="Updating Profile" showBoot={false} />
              )}

              {/* Profile Image */}
              <View className="flex-1 justify-center items-center my-5">
                <Pressable onPress={() => updateImage({ type: "profile" })}>
                  {zustandProfileImage ? (
                    <Image
                      source={{ uri: zustandProfileImage }}
                      className="rounded-full xs:w-40 xs:h-40"
                    />
                  ) : (
                    <Image
                      source={require("@/assets/images/profile.png")}
                      className="rounded-full xs:w-40 xs:h-40"
                    />
                  )}
                </Pressable>
              </View>

              {/* Background & Inputs */}
              <View className="bg-shopAccent flex-1 m-3 rounded-xl border-[#2a3141] border-[1px]">
                <Pressable onPress={() => updateImage({ type: "background" })}>
                  {zustandBackgroundImage ? (
                    <ImageBackground
                      source={{ uri: zustandBackgroundImage }}
                      className="rounded-xl overflow-hidden rounded-br-none rounded-bl-none xs:h-[100px]"
                    />
                  ) : (
                    <ImageBackground
                      source={require("@/assets/images/default-background.jpg")}
                      className="rounded-2xl overflow-hidden rounded-br-none rounded-bl-none xs:h-20"
                    />
                  )}
                </Pressable>

                <Text className="text-white my-3 text-center font-exoBold text-xs xs:text-[15px]">
                  UPDATE PROFILE INFORMATION
                </Text>

                <View className="my-3 px-5">
                  {/* Username */}
                  <Text className="text-white mb-2 text-xs xs:text-[12px] font-exoLight">
                    USERNAME
                  </Text>
                  <View className="flex-row bg-[#1E212F] rounded-[10px]">
                    <TextInput
                      value={userName}
                      onChangeText={setUserName}
                      placeholder={zustandUserName}
                      className="text-[#ffffff9e] bg-[#1E212F] flex-1 xs:text-xs p-4 rounded-[10px]"
                      placeholderTextColor="rgba(128,128,128,0.5)"
                    />
                  </View>

                  {/* Bio */}
                  <Text className="text-white mt-3 mb-2 text-xs xs:text-[12px] font-exoLight">
                    BIO
                  </Text>
                  <View className="flex-row bg-[#1E212F] rounded-[10px]">
                    <TextInput
                      value={bio}
                      onChangeText={setBio}
                      placeholder={zustandBio}
                      className="text-[#ffffff9e] bg-[#1E212F] flex-1 xs:text-xs p-4 rounded-[10px]"
                      placeholderTextColor="rgba(128,128,128,0.5)"
                    />
                  </View>
                </View>

                {/* Reset Password */}
                <Pressable
                  onPress={() => resetPassword.setVisibility((prev) => !prev)}
                >
                  <Text className="text-white text-center text-xs font-exoLight opacity-70 mt-3">
                    Reset Password
                  </Text>
                </Pressable>

                {/* Save & Logout Buttons */}
                <View className="pt-10 gap-3 px-3">
                  <TouchableOpacity
                    onPress={() => {
                      if (!userName.trim() && !bio.trim()) {
                        alert("Empty credentials");
                        return;
                      }
                      confirmationModal.setVisibility(true);
                    }}
                  >
                    <Text className="text-white text-center py-2 font-exoBold rounded-xl bg-green-500 text-xs xs:text-[12px]">
                      Save Changes
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => logOutModal.setVisibility(true)}
                  >
                    <Text className="text-white text-center py-2 font-exoBold rounded-xl bg-red-500 text-xs xs:text-[12px]">
                      Log out
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Modals */}
              {logOutModal.visibility && (
                <SignOutModal
                  onConfirm={logOut}
                  visibility={logOutModal.visibility}
                  scaleStyle={logOutModal.scaleStyle}
                  closeModal={logOutModal.closeModal}
                />
              )}
              {resetPassword.visibility && (
                <ResetPasswordModal {...resetPassword} />
              )}
              {confirmationModal.visibility && (
                <ConfirmationModal
                  onConfirm={() => {
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
            </KeyboardAwareScrollView>
          </CustomGeneralContainer>
        </View>
      </KeyboardAvoidingView>
    </ProtectedRoutes>
  );
};

export default Settings;
