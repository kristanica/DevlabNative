import { FIREBASE_AUTH } from "@/firebaseConfig";
import { fontFamily } from "@/fontFamily/fontFamily";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";

import {
  Image,
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
  const [imageBackground, setImageBackground] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");

  const pickImage = async (
    setImage: (val: string) => void,
    keyStorage: string
  ) => {
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
        setImage(uri);
        await AsyncStorage.setItem(keyStorage, uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const out = async () => {
    try {
      await signOut(auth);
      alert("Log out!");
    } catch {
      alert("Something went wrong....");
    }
  };

  useEffect(() => {
    const loadStorage = async () => {
      try {
        const backgroundVal = await AsyncStorage.getItem("imageUri");
        const profileVal = await AsyncStorage.getItem("profileUri");

        if (backgroundVal && profileVal) {
          setImageBackground(backgroundVal);
          setProfilePicture(profileVal);
          console.log("loaded!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadStorage();
  }, []);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView className="bg-background flex-1 flex-row justify-center items-center">
        <View className="flex-1 bg-accent m-[10px] rounded-[10px]">
          <View className=" justify-center items-center flex-[1] ">
            <Pressable
              onPress={() => pickImage(setProfilePicture, "profileUri")}
            >
              {profilePicture && (
                <Image
                  source={{ uri: profilePicture }}
                  className="flex-[1] w-[220px] rounded-[50%]"
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
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
