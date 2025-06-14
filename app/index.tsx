import InputBox from "@/assets/components/InputBox";
import Loading from "@/assets/components/Loading";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { fontFamily } from "@/fontFamily/fontFamily";
import Ionicons from "@expo/vector-icons/Ionicons";

import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
const Login = () => {
  // State variables to manage login state
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);
  const auth = FIREBASE_AUTH;
  // Function to open the failed login modal

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      Keyboard.dismiss;
      router.replace("/Home");
    } catch (error) {
      alert("Something happened idk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background justify-center items-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* // Header Container */}
      <View>
        <Text
          className="color-white  mb-5 text-3xl"
          style={{ fontFamily: fontFamily.ExoExtraBold }}
        >
          DEVLAB
        </Text>
      </View>

      {/* // Main Login Container */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          className="h-[500px] rounded-3xl  bg-accent flex-col w-[25rem] "
          style={styles.shadow}
        >
          {/* Icon Container */}
          <View className="flex-[2]   justify-center items-center">
            <Ionicons name="person-circle" size={200} color={"#314A70"} />
          </View>
          {/*  This container holds the input fields for username and password */}
          <View className="flex-[1] justify-center items-center  ">
            {/* Username */}
            <InputBox
              icon={"person"}
              placeHolder={"Username"}
              value={email}
              setValue={setEmail}
            />
            {/* Password */}
            <InputBox
              icon={"lock-closed"}
              placeHolder={"Password"}
              value={password}
              setValue={setPassword}
              isPassword={true}
            />
          </View>
          {/*  Login Button Container */}
          <View className="flex-[.5]  justify-center items-center ">
            <TouchableOpacity
              className="bg-button flex-[1] w-[8rem] justify-center items-center my-2 rounded-full "
              onPress={signIn}
            >
              <Text
                className="color-white text-lg "
                style={{ fontFamily: fontFamily.ExoBold }}
              >
                LOGIN
              </Text>
            </TouchableOpacity>
          </View>

          {/* Register Container */}
          <View className="flex-[1]  justify-center items-center">
            <Text
              className="color-[#FFFFFE]"
              style={{ fontFamily: fontFamily.ExoRegular }}
            >
              Don't have an account?
            </Text>
            {/* // TouchableOpacity to navigate to the Register page */}
            <TouchableOpacity onPress={() => router.replace("/auth/Register")}>
              <Text
                className="color-[#4F80C5] mt-2"
                style={{ fontFamily: fontFamily.ExoRegular }}
              >
                Register here
              </Text>
            </TouchableOpacity>
          </View>

          {/* This will show a loading spinner when the user is logging in */}
          {loading && <Loading />}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
// Styles for the shadow effect
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0,
  },
});
