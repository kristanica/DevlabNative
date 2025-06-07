import FailedLogin from "@/assets/components/FailedLogin";
import InputBox from "@/assets/components/InputBox";
import SampleLoading from "@/assets/components/SampleLoading";
import { fontFamily } from "@/fontFamily/fontFamily";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
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
  // Mock user data for demonstration purposes
  const users = [
    {
      id: 1,
      username: "1",
      password: "1",
      role: "admin",
    },
    {
      id: 2,
      username: "devlabuser",
      password: "learn2code",
      role: "student",
    },
  ];

  // State variables to manage login state
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  // Function to open the failed login modal

  const openFailedLogin = () => {
    setFailedLogin(false);
  };

  // Function to check if the user exists and redirect to the home page
  const checkLogin = () => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    // If user exists, redirect to home page after 2 seconds

    if (user) {
      setLoading(true);
      setTimeout(() => {
        router.push("/home");
        setLoading(false);
      }, 2000);
    } else {
      // If user does not exist, show the failed login modal
      setFailedLogin(true);
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
              value={username}
              setValue={setUsername}
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
              onPress={checkLogin}
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
            <TouchableOpacity onPress={() => router.push("/auth/Register")}>
              <Text
                className="color-[#4F80C5] mt-2"
                style={{ fontFamily: fontFamily.ExoRegular }}
              >
                Register here
              </Text>
            </TouchableOpacity>
          </View>

          {/* This will show a loading spinner when the user is logging in */}
          {loading && <SampleLoading />}
          {/* This will show the FailedLogin modal when the user fails to login */}
          {failedLogin && (
            <FailedLogin show={failedLogin} closeModal={openFailedLogin} />
          )}
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
