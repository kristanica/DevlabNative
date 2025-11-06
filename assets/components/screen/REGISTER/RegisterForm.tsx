import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InputBox from "../../InputBox";
type RegisterFormPayload = {
  dispatch: React.ActionDispatch<any>;
  state: {
    email: string;
    password: string;
    username: string;
    confirmPassword: string;
  };
  handleRegister: () => Promise<void>;
};
const RegisterForm = ({
  dispatch,
  state,
  handleRegister,
}: RegisterFormPayload) => {
  return (
    <View className="w-3/4 aspect-[1/2] rounded-3xl bg-accent flex-col items-center justify-center p-2">
      <Ionicons
        name="person-circle"
        size={120}
        color={"#314A70"}
        className="mx-auto my-2"
      />

      <View>
        <InputBox
          placeHolder={"Email"}
          value={state.email}
          setValue={(text) =>
            dispatch({
              type: "UPDATE_FIELD",
              field: "email",
              value: text,
            })
          }
          icon={"mail"}
        />

        <InputBox
          placeHolder={"Password"}
          value={state.password}
          setValue={(text) =>
            dispatch({
              type: "UPDATE_FIELD",
              field: "password",
              value: text,
            })
          }
          icon={"lock-closed"}
          isPassword={true}
        />

        <InputBox
          placeHolder={"Confirm Password"}
          value={String(state.confirmPassword)}
          setValue={(text) =>
            dispatch({
              type: "UPDATE_FIELD",
              field: "confirmPassword",
              value: text,
            })
          }
          icon={"lock-closed"}
          isPassword={true}
        />
        <InputBox
          placeHolder={"Username"}
          value={state.username}
          setValue={(text) =>
            dispatch({
              type: "UPDATE_FIELD",
              field: "username",
              value: text,
            })
          }
          icon={"person"}
        />
      </View>

      <TouchableOpacity onPress={handleRegister} className="w-full">
        <Text className="text-white font-exoBold  text-center bg-button px-7 py-2 xs: text-sm xs:text-[12px] md:lg my-5 rounded-2xl">
          REGISTER
        </Text>
      </TouchableOpacity>

      <View className="justify-center items-center">
        <Text className="color-[#FFFFFE] font-exoRegular text-sm xs:text-[12px]">
          Already have an Account?
        </Text>

        <TouchableOpacity onPress={() => router.replace("/Login")}>
          <Text className="color-[#4F80C5] mt-2 font-exoRegular text-sm xs:text-[10px]">
            Login here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({});
