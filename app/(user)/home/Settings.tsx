import AdminModal from "@/assets/components/SettingsComponents/AdminModal";

import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import ButtonAnimated from "@/assets/components/ButtonComponent";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import useModal from "@/assets/Hooks/useModal";
import usePickImage from "@/assets/Hooks/usePickImage";
import { boxShadow } from "@/assets/styles/ContainerStyles";
import { useBackground } from "@/assets/zustand/BackgroundProvider";
import { useProfile } from "@/assets/zustand/ProfileProvider";
import React, { useState } from "react";

import ConfirmationModal from "@/assets/components/SettingsComponents/ConfirmationModal";
import SignOutModal from "@/assets/components/SettingsComponents/SignOutModal";

import useKeyBoardHandler from "@/assets/Hooks/useKeyBoardHandler";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import {
  Image,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
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

  const { keyBoardHandlingStyle } = useKeyBoardHandler();
  return (
    <ProtectedRoutes>
      <View className="bg-accent flex-1">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <Animated.View className="flex-1" style={[keyBoardHandlingStyle]}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-[1] bg-accent  rounded-[10px] ">
                  <View className="flex-[.7] justify-center items-center">
                    <Pressable onPress={pickImageProfile}>
                      {profileVal ? (
                        <Image
                          source={{ uri: profileVal }}
                          className="flex-[1] rounded-full w-[180px]"
                        />
                      ) : (
                        <Image
                          source={require("@/assets/images/profile.png")}
                          className="flex-[1] rounded-full w-[180px]"
                        />
                      )}
                    </Pressable>
                  </View>
                  {/* Container */}
                  <View
                    className="flex-[2] bg-shopAccent m-[10px] rounded-2xl"
                    style={[{}, boxShadow.shadow]}
                  >
                    <Pressable
                      className="flex-[1]"
                      onPress={pickImageBackground}
                    >
                      {/* Background image of user */}
                      {backgroundVal && (
                        <ImageBackground
                          className="flex-[1] rounded-2xl overflow-hidden rounded-br-none rounded-bl-none"
                          source={{ uri: backgroundVal }}
                        ></ImageBackground>
                      )}
                    </Pressable>

                    <View className="flex-[.5] items-center justify-center">
                      <Text
                        className="text-white text-center text-2xl font-exoBold"
                        style={[boxShadow.textShadowLight]}
                      >
                        UPDATE PROFILE INFORMATION
                      </Text>
                    </View>

                    <View className="flex-[2]">
                      <View>
                        {/* Username Textinput */}
                        <Text className="text-white mx-5 mb-2">Username</Text>
                        <View className="flex-row bg-[#1E212F] mx-5 p-3 rounded-[10px]">
                          <TextInput
                            value={userName}
                            onChangeText={setUserName}
                            // placeholder={"username"}
                            placeholder={userData?.username}
                            className="text-white bg-[#1E212F] flex-[1]"
                          />
                        </View>
                      </View>

                      {/* Bio textinput */}
                      <View className="mt-3">
                        <Text className="text-white mx-5 mb-2">Bio</Text>

                        <View className="flex-row bg-[#1E212F] mx-5 p-3 rounded-[10px]">
                          <TextInput
                            value={bio}
                            onChangeText={setBio}
                            // placeholder={"Bio"}
                            placeholder={userData?.bio}
                            className="text-white flex-[1]"
                          />
                        </View>
                      </View>
                    </View>

                    <View className="flex-[2] items-center pt-10   ">
                      <ButtonAnimated
                        backgroundColor="#7F5AF0"
                        onPressAction={() => {
                          Keyboard.dismiss;
                          if (!userName.trim() && !bio.trim()) {
                            alert("Empty credentials");
                            return;
                          }
                          confirmationModal.setVisibility(true);
                        }}
                      >
                        <Text className="text-white py-4 px-16 font-exoBold">
                          Save Changes
                        </Text>
                      </ButtonAnimated>

                      <ButtonAnimated
                        backgroundColor="#FF6166"
                        onPressAction={() => logOutModal.setVisibility(true)}
                      >
                        <Text className="text-white py-4 px-20 font-exoBold">
                          Log out
                        </Text>
                      </ButtonAnimated>

                      <ButtonAnimated
                        backgroundColor="transparent"
                        onPressAction={() => adminModal.setVisibility(true)}
                      >
                        <Text className="text-white font-exoLight">
                          Login as Administrator
                        </Text>
                      </ButtonAnimated>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
            {adminModal.visibility && (
              <AdminModal
                visibility={adminModal.visibility}
                scaleStyle={adminModal.scaleStyle}
                closeModal={adminModal.closeModal}
              />
            )}
            {logOutModal.visibility && (
              <SignOutModal
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
