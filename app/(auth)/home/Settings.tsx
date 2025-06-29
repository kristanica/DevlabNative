import AdminModal from "@/assets/components/SettingsComponents/AdminModal";

import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import ButtonAnimated from "@/assets/components/ButtonComponent";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import useModal from "@/assets/Hooks/useModal";
import usePickImage from "@/assets/Hooks/usePickImage";
import { useBackground } from "@/assets/Provider/BackgroundProvider";
import { useProfile } from "@/assets/Provider/ProfileProvider";
import { boxShadow } from "@/assets/styles/ContainerStyles";
import { fontFamily } from "@/fontFamily/fontFamily";
import React from "react";

import SignOutModal from "@/assets/components/SettingsComponents/SignOutModal";
import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Settings = () => {
  const { backgroundVal } = useBackground();
  const { profileVal } = useProfile();
  const logOutModal = useModal();
  const adminModal = useModal();

  const { pickImageProfile, pickImageBackground } = usePickImage();

  return (
    <ProtectedRoutes>
      <View className="bg-accent flex-1">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <KeyboardAvoidingView
              className="flex-1"
              behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-[1] bg-accent  rounded-[10px] ">
                  <View className="flex-[.7] justify-center items-center">
                    <Pressable onPress={pickImageProfile}>
                      {profileVal && (
                        <Image
                          source={{ uri: profileVal }}
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
                        className="text-white text-center text-2xl"
                        style={[
                          { fontFamily: fontFamily.ExoBold },
                          boxShadow.textShadowLight,
                        ]}
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
                            placeholder={"Username goes here..."}
                            className="text-white bg-[#1E212F] flex-[1]"
                          />
                        </View>
                      </View>

                      {/* Bio textinput */}
                      <View className="mt-3">
                        <Text className="text-white mx-5 mb-2">Bio</Text>

                        <View className="flex-row bg-[#1E212F] mx-5 p-3 rounded-[10px]">
                          <TextInput
                            placeholder={"Bio goes here...."}
                            className="text-white flex-[1]"
                          />
                        </View>
                      </View>
                    </View>

                    <View className="flex-[2] items-center pt-10   ">
                      <ButtonAnimated backgroundColor="#7F5AF0">
                        <Text
                          className="text-white py-4 px-16"
                          style={{ fontFamily: fontFamily.ExoBold }}
                        >
                          Save Changes
                        </Text>
                      </ButtonAnimated>

                      <ButtonAnimated
                        backgroundColor="#FF6166"
                        onPressAction={() => logOutModal.setVisibility(true)}
                      >
                        <Text
                          className="text-white py-4 px-20"
                          style={{ fontFamily: fontFamily.ExoBold }}
                        >
                          Log out
                        </Text>
                      </ButtonAnimated>

                      <ButtonAnimated
                        backgroundColor="transparent"
                        onPressAction={() => adminModal.setVisibility(true)}
                      >
                        <Text
                          className="text-white"
                          style={{ fontFamily: fontFamily.ExoLight }}
                        >
                          Login as Administrator
                        </Text>
                      </ButtonAnimated>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
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
          </CustomGeneralContainer>
        </AnimatedViewContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default Settings;

const styles = StyleSheet.create({});
