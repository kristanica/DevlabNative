import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import FillScreenLoading from "@/assets/components/global/FillScreenLoading";
import RenderCounter from "@/assets/components/global/RenderCounter";
import ForgotPasswordModal from "@/assets/components/RegisterComponents/ForgotPasswordModal";
import LoginForm from "@/assets/components/screen/LOGIN/LoginForm";
import useLogin from "@/assets/Hooks/reducers/useLogin";
import useModal from "@/assets/Hooks/useModal";
import toastHandler from "@/assets/zustand/toastHandler";
import { auth } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, { FadeIn } from "react-native-reanimated";

const Login = () => {
  RenderCounter("login");
  const { state, dispatch, signIn } = useLogin();
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);
  const handleLogin = async () => {
    if (state.email === "" || state.password === "") {
      setToastVisibility(
        "emptyCredentialField",
        "Fill in the following credentials!"
      );
      return;
    }

    const res = await signIn();
    setToastVisibility(String(res![0]), String(res![1]));
  };

  const forgotPassword = useModal();

  const setForgotPasswordVisibility = useCallback(() => {
    forgotPassword.setVisibility((prev) => !prev);
  }, [forgotPassword]);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const currentuser = auth.currentUser;
        const val = await AsyncStorage.getItem("isLoggin");
        if (val === "false" && currentuser) {
          await signOut(auth);
          return;
        }
        if (val === "true" && currentuser) {
          router.replace("/home/Home");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkLogin();
  }, []);
  return (
    <View className="flex-1 bg-background ">
      <Animated.View entering={FadeIn.duration(500)} style={{ flex: 1 }}>
        <CustomGeneralContainer>
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 20,
            }}
            enableOnAndroid
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
          >
            {state.isLoggingIn && (
              <FillScreenLoading text="Logging in...."></FillScreenLoading>
            )}
            {forgotPassword.visibility && (
              <ForgotPasswordModal {...forgotPassword}></ForgotPasswordModal>
            )}
            {/* <Logo></Logo> */}
            <LoginForm
              handleLogin={handleLogin}
              state={state}
              dispatch={dispatch}
              setForgotPasswordVisibility={setForgotPasswordVisibility}
            ></LoginForm>
          </KeyboardAwareScrollView>
        </CustomGeneralContainer>
      </Animated.View>
    </View>
  );
};

export default Login;
