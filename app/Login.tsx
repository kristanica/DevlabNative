import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import InputBox from "@/assets/components/InputBox";
import ForgotPasswordModal from "@/assets/components/RegisterComponents/ForgotPasswordModal";
import useLogin from "@/assets/Hooks/reducers/useLogin";
import useModal from "@/assets/Hooks/useModal";
import toastHandler from "@/assets/zustand/toastHandler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated from "react-native-reanimated";

const Login = () => {
  const { state, dispatch, signIn } = useLogin();
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);

  const forgotPassword = useModal();

  return (
    <View className="flex-1 bg-background ">
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
          <Text className="color-white  mb-5 text-3xl font-[500] font-exoExtraBold">
            DEVLAB
          </Text>

          <Animated.View className="w-3/4  aspect-[1/2] rounded-3xl bg-accent flex-col items-center justify-center ">
            <View className=" justify-center items-center  h-[100%] w-[100%]">
              <View className="">
                <Ionicons name="person-circle" size={140} color={"#314A70"} />
              </View>

              <View className="px-2">
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
              <TouchableOpacity
                onPress={() => forgotPassword.setVisibility((prev) => !prev)}
              >
                <Text className=" color-[#4F80C5] -2 font-exoRegula xs:text-xs ">
                  Forgot password
                </Text>
              </TouchableOpacity>
              <View className="flex-row mt-5">
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
                <Text className=" text-white opacity-20 xs:text-xs font-exoRegular ">
                  Keep me signed in
                </Text>
              </View>

              <TouchableOpacity
                onPress={async () => {
                  if (state.email === "" || state.password === "") {
                    setToastVisibility(
                      "emptyCredentialField",
                      "Fill in the following credentials!"
                    );
                    return;
                  }

                  const res = await signIn();
                  setToastVisibility(String(res![0]), String(res![1]));
                }}
              >
                <Text className="text-white font-exoBold  bg-button px-7 py-2 xs: text-xs sm:text-base md:lg my-5 rounded-2xl">
                  LOGIN
                </Text>
              </TouchableOpacity>

              <Text className="color-[#FFFFFE] font-exoRegular xs: text-xs">
                Don't have an account?
              </Text>

              <TouchableOpacity
                onPress={() => router.push({ pathname: "/Register" })}
              >
                <Text className=" color-[#4F80C5] -2 font-exoRegula xs:text-xs ">
                  Register here
                </Text>
              </TouchableOpacity>
            </View>

            {forgotPassword.visibility && (
              <ForgotPasswordModal {...forgotPassword}></ForgotPasswordModal>
            )}
          </Animated.View>
        </KeyboardAwareScrollView>
      </CustomGeneralContainer>
    </View>
  );
};

export default Login;
