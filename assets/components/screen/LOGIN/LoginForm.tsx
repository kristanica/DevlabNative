import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import InputBox from "../../InputBox";
type LoginFormPayload = {
  dispatch: React.ActionDispatch<any>;
  state: {
    email: string;
    password: string;
    keepSign: boolean;
    isLoggingIn: boolean;
  };
  handleLogin: () => Promise<void>;
  setForgotPasswordVisibility: () => void;
};
const LoginForm = ({
  dispatch,
  state,
  handleLogin,
  setForgotPasswordVisibility,
}: LoginFormPayload) => {
  return (
    <View className="w-3/4  aspect-[1/2] rounded-3xl bg-accent flex-col items-center justify-center ">
      <View className=" justify-center items-center  h-[100%] w-[100%]">
        <Ionicons name="person-circle" size={140} color={"#314A70"} />
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
        <TouchableOpacity onPress={setForgotPasswordVisibility}>
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

        <TouchableOpacity onPress={handleLogin} disabled={state.isLoggingIn}>
          <Text className="text-white font-exoBold  bg-button px-7 py-2 xs: text-xs sm:text-base md:lg my-5 rounded-2xl">
            LOGIN
          </Text>
        </TouchableOpacity>

        <Text className="color-[#FFFFFE] font-exoRegular xs: text-xs">
          {"Don't have an account?"}
        </Text>

        <TouchableOpacity
          onPress={() => router.push({ pathname: "/Register" })}
        >
          <Text className=" color-[#4F80C5] -2 font-exoRegula xs:text-xs ">
            Register here
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push({ pathname: "/AdminLogin" })}
          className="mt-5"
        >
          <Text className=" color-[#4F80C5] -2 font-exoRegula xs:text-xs ">
            Login as Administrator
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;
