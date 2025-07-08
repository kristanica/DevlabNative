import InputBox from "@/assets/components/InputBox";
import OnFailedLogin from "@/assets/components/LoginComponents/OnFailedLogin";
import Splash from "@/assets/components/Splash";
import useLogin from "@/assets/Hooks/useLogin";
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
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, { FadeIn } from "react-native-reanimated";

const Login = () => {
  const [splash, setSplash] = useState(true);
  //custom hook
  const { state, dispatch, signIn } = useLogin();
  //incorrect animation state
  const [trigger, setTrigger] = useState<boolean>(false);

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
          <Text className="color-white  mb-5 text-3xl font-exoExtraBold">
            DEVLAB
          </Text>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <OnFailedLogin trigger={trigger}>
              <Animated.View
                className="h-[500px] rounded-3xl  bg-accent flex-col w-[25rem] "
                style={[styles.shadow]}
              >
                <View className="flex-[2]   justify-center items-center">
                  <Ionicons name="person-circle" size={200} color={"#314A70"} />
                </View>

                {/*  This container holds the input fields for username and password */}
                <View className="flex-[1] justify-center items-center  ">
                  {/* Username */}
                  <InputBox
                    icon={"person"}
                    placeHolder={"Username"}
                    value={state.email}
                    setValue={(text) =>
                      dispatch({
                        type: "UPDATE_FIELD",
                        field: "email",
                        value: text,
                      })
                    }
                  />
                  {/* Password */}
                  <InputBox
                    icon={"lock-closed"}
                    placeHolder={"Password"}
                    value={state.password}
                    setValue={(text) =>
                      dispatch({
                        type: "UPDATE_FIELD",
                        field: "password",
                        value: text,
                      })
                    }
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
                      textDecorationLine: "none",
                    }}
                    onPress={(boolean) => {
                      dispatch({
                        type: "UPDATE_FIELD",
                        field: "keepSign",
                        value: boolean,
                      });
                    }}
                  />
                  <Text className="py-[6px] text-white opacity-20 text-sm font-exoRegular">
                    Keep me signed in
                  </Text>
                </View>
                {/*  Login Button Container */}
                <View className="flex-[.5] justify-center items-center ">
                  <TouchableOpacity
                    className="bg-button flex-[1] w-[8rem] justify-center items-center my-2 rounded-full "
                    //Calls Sign In. Will trigger animation if credentials are false.
                    onPress={() => {
                      signIn(() => {
                        setTrigger(true);
                      });
                      setTrigger(false);
                    }}
                  >
                    <Text className="color-white text-lg font-exoBold">
                      LOGIN
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Register Container */}
                <View className="flex-[1]  justify-center items-center">
                  <Text className="color-[#FFFFFE] font-exoRegular">
                    Don't have an account?
                  </Text>
                  {/* // TouchableOpacity to navigate to the Register page */}
                  <TouchableOpacity onPress={() => router.replace("/Register")}>
                    <Text className="color-[#4F80C5] mt-2 font-exoRegular">
                      Register here
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </OnFailedLogin>
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
