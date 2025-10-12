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
    age: any;
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
        <InputBox
          placeHolder={"Age"}
          value={String(state.age)}
          setValue={(text) =>
            dispatch({
              type: "UPDATE_FIELD",
              field: "age",
              value: text,
            })
          }
          icon={"calendar"}
        />
      </View>

      <View className=" justify-center items-center ">
        <TouchableOpacity onPress={handleRegister}>
          <Text className="text-white font-exoBold  bg-button px-7 py-2 xs: text-xs sm:text-base md:lg my-5 rounded-2xl">
            REGISTER
          </Text>
        </TouchableOpacity>
      </View>
      <View className="justify-center items-center">
        <Text className="color-[#FFFFFE] font-exoRegular xs:text-[8px]">
          Already have an Account?
        </Text>

        <TouchableOpacity onPress={() => router.replace("/Login")}>
          <Text className="color-[#4F80C5] mt-2 font-exoRegular xs:text-[8px]">
            Login here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({});
