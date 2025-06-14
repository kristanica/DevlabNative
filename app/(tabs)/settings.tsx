import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import { useBackground } from "@/assets/Provider/BackgroundProvider";
import { useProfile } from "@/assets/Provider/ProfileProvider";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { fontFamily } from "@/fontFamily/fontFamily";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";

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
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Settings = () => {
  const auth = FIREBASE_AUTH;

  const { backgroundVal, setBackground } = useBackground();
  const { profileVal, setProfile } = useProfile();

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

  const out = async () => {
    try {
      await AsyncStorage.removeItem("isLoggin");
      await signOut(auth);
      alert("Log out!");
    } catch {
      alert("Something went wrong....");
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
              <View className="flex-[2] bg-shopAccent m-[20px] rounded-2xl">
                <Pressable className="flex-[1]" onPress={pickImageBackground}>
                  {/* Background image of user */}
                  {backgroundVal && (
                    <ImageBackground
                      className="flex-[1] rounded-2xl overflow-hidden rounded-br-none rounded-bl-none"
                      source={{ uri: backgroundVal }}
                    ></ImageBackground>
                  )}
                </Pressable>
                <Pressable onPress={() => router.replace("/Home")}>
                  <Text>asda</Text>
                </Pressable>
                <View className="flex-[.5] items-center justify-center">
                  <Text
                    className="text-white text-center text-2xl"
                    style={{ fontFamily: fontFamily.ExoExtraBold }}
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

                <View className="flex-[2]  items-center pt-10   ">
                  <TouchableOpacity className="bg-button flex-[.5] w-[15rem] rounded-full justify-center items-center">
                    <Text
                      className="text-white"
                      style={{ fontFamily: fontFamily.ExoBold }}
                    >
                      Save Changes
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={out}
                    className="bg-[#FF6166] flex-[.5] my-2 w-[15rem] rounded-full justify-center items-center"
                  >
                    <Text
                      className="text-white"
                      style={{ fontFamily: fontFamily.ExoBold }}
                    >
                      Logout
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="flex-[.5]">
                    <Text
                      className="text-white"
                      style={{ fontFamily: fontFamily.ExoLight }}
                    >
                      Login as Administrator
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ProtectedRoutes>
  );
};

export default Settings;

const styles = StyleSheet.create({});
{
  /* <View className="flex-1 bg-accent m-[10px] rounded-[10px]">
          <View className=" justify-center items-center flex-[1] ">
            <Pressable
              onPress={() => pickImage(setProfilePicture, "profileUri")}
            >
              {profilePicture && (
                <Image
                  source={{ uri: profilePicture }}
                  className="flex-[1] w-[220px] rounded-full"
                />
              )}
            </Pressable>
          </View>

          {imageBackground && (
            <Image
              source={{ uri: imageBackground }}
              style={{ flex: 0.3, margin: 3, borderRadius: 10 }}
            />
          )}

          <View className="justify-center items-center flex-[.1]">
            <Pressable
              onPress={() => pickImage(setImageBackground, "imageUri")}
            >
              <Text
                className="text-white text-2xl"
                style={{ fontFamily: fontFamily.ExoBold }}
              >
                Update profile picture
              </Text>
            </Pressable>
          </View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className=" flex-[1] justify-evenly">
              <View className="">
                <Text className="text-white mx-5 mb-2">Username</Text>

                <View className="flex-row bg-[#1E212F] mx-5 p-3 rounded-[10px]">
                  <Ionicons
                    name={"person"}
                    size={20}
                    className="mx-3 border-r-2 pr-2 border-black"
                    color={"#FFFFFE"}
                  />

                  <TextInput
                    placeholder={"Hello"}
                    className="text-red-500 bg-[#1E212F] flex-1"
                  />
                </View>
              </View>

              <View className="">
                <Text className="text-white mx-5 mb-2">Bio</Text>

                <View className="flex-row bg-[#1E212F] mx-5 rounded-[10px]">
                  <TextInput
                    placeholder={"Your bio goes here"}
                    className="text-red-500 flex-[1] p-3"
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View className="flex-[.5]  items-center justify-evenly flex-col">
            <TouchableOpacity className="bg-button flex-[.5] w-[15rem] rounded-full justify-center items-center">
              <Text
                className="text-white"
                style={{ fontFamily: fontFamily.ExoBold }}
              >
                Save Changes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={out}
              className="bg-[#FF6166] flex-[.5] my-2 w-[15rem] rounded-full justify-center items-center"
            >
              <Text
                className="text-white"
                style={{ fontFamily: fontFamily.ExoBold }}
              >
                Logout
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-[.5]">
              <Text
                className="text-white"
                style={{ fontFamily: fontFamily.ExoLight }}
              >
                Login as Administrator
              </Text>
            </TouchableOpacity>
          </View>
        </View> */
}
