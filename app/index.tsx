import InputBox from "@/assets/components/InputBox";
import Loading from "@/assets/components/Loading";
import Splash from "@/assets/components/Splash";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { fontFamily } from "@/fontFamily/fontFamily";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
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
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, { FadeIn } from "react-native-reanimated";

const Login = () => {
  // State variables to manage login state
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSign, setKeepSign] = useState(false);
  const [splash, setSplash] = useState(true);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Keyboard.dismiss();
      // Determine wheter to keep sign in or not
      if (keepSign) {
        await AsyncStorage.setItem("isLoggin", "true");
      } else {
        await AsyncStorage.removeItem("isLoggin");
      }
      router.replace("/(auth)/home/Home");
    } catch (error) {
      alert("Something happened idk");
    } finally {
      setLoading(false);
    }
  };

  // Redirects user to (tabs)/Home.tsx if keepSign is true
  useEffect(() => {
    const keepSignIn = async () => {
      try {
        const val = await AsyncStorage.getItem("isLoggin");
        if (val === "true") {
          router.replace("/(auth)/home/Home");
        }
      } catch (error) {
        console.log(error);
      }
    };

    keepSignIn();
  }, []);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background justify-center items-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* // Header Container */}

      {splash ? (
        <Splash onEnd={() => setSplash(false)} />
      ) : (
        <Animated.View
          className="justify-center items-center"
          entering={FadeIn.duration(500)}
        >
          <Text
            className="color-white  mb-5 text-3xl"
            style={{ fontFamily: fontFamily.ExoExtraBold }}
          >
            DEVLAB
          </Text>

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
              <View className="flex-row m-auto flex-[.3] ">
                <BouncyCheckbox
                  size={20}
                  fillColor="#00FFBF"
                  unFillColor="#111827"
                  iconStyle={{ borderColor: "red" }}
                  innerIconStyle={{ borderWidth: 1 }}
                  textStyle={{
                    fontFamily: fontFamily.ExoLight,
                    textDecorationLine: "none",
                  }}
                  onPress={() => {
                    setKeepSign(!keepSign);
                    console.log(keepSign);
                  }}
                />
                <Text className="py-[6px] text-white opacity-20 text-sm">
                  Keep me signed in
                </Text>
              </View>
              {/*  Login Button Container */}
              <View className="flex-[.5] justify-center items-center ">
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
                <TouchableOpacity onPress={() => router.replace("/Register")}>
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
        </Animated.View>
      )}
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
