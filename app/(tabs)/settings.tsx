import AdminModal from "@/assets/components/AdminModal";
import ButtonAnimated from "@/assets/components/ButtonComponent";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import SignOutModal from "@/assets/components/SignOutModal";
import { useBackground } from "@/assets/Provider/BackgroundProvider";
import { useProfile } from "@/assets/Provider/ProfileProvider";
import { boxShadow } from "@/assets/styles/ContainerStyles";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { fontFamily } from "@/fontFamily/fontFamily";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";

import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Settings = () => {
  const auth = FIREBASE_AUTH;

  const { backgroundVal, setBackground } = useBackground();
  const { profileVal, setProfile } = useProfile();
  const [logOutVisibility, setLogOutVisibility] = useState<boolean>(false);
  const [adminVisibility, setAdminVisibility] = useState<boolean>(false);

  // pick user background
  const pickImageBackground = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });
      if (result.canceled) {
        console.log("canceled");
      }

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setBackground(uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //pick user profile
  const pickImageProfile = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [2, 3],
        quality: 1,
      });
      if (result.canceled) {
        console.log("canceled");
      }

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        await AsyncStorage.setItem("profileUri", uri);
        setProfile(uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProtectedRoutes>
      <SafeAreaView className="bg-background flex-1">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-[1] bg-accent m-[10px] rounded-[10px] ">
              <View className="flex-[.7] justify-center items-center py-2">
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
                className="flex-[2] bg-shopAccent m-[20px] rounded-2xl"
                style={[{}, boxShadow.shadow]}
              >
                <Pressable className="flex-[1]" onPress={pickImageBackground}>
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
                  <ButtonAnimated
                    height={40}
                    width={170}
                    backgroundColor="#7F5AF0"
                  >
                    <Text
                      className="text-white"
                      style={{ fontFamily: fontFamily.ExoBold }}
                    >
                      Save Changes
                    </Text>
                  </ButtonAnimated>

                  <ButtonAnimated
                    height={40}
                    width={170}
                    backgroundColor="#FF6166"
                    onPressAction={() => setLogOutVisibility(true)}
                  >
                    <Text
                      className="text-white"
                      style={{ fontFamily: fontFamily.ExoBold }}
                    >
                      Log out
                    </Text>
                  </ButtonAnimated>

                  <ButtonAnimated
                    height={20}
                    width={150}
                    backgroundColor="transparent"
                    onPressAction={() => setAdminVisibility(true)}
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
        {adminVisibility && <AdminModal setVisibility={setAdminVisibility} />}
        {logOutVisibility && (
          <SignOutModal setVisibility={setLogOutVisibility} />
        )}
      </SafeAreaView>
    </ProtectedRoutes>
  );
};

export default Settings;

const styles = StyleSheet.create({});
