import InputBox from "@/assets/components/InputBox";
import OnSuccessRegisterModal from "@/assets/components/RegisterComponents/OnSuccessRegisterModal";
import useModal from "@/assets/Hooks/useModal";
import useRegister from "@/assets/Hooks/useRegister";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

const Register = () => {
  //custom hook
  const { state, dispatch, handleRegister } = useRegister();

  const { visibility, setVisibility, scaleStyle, closeModal } = useModal();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background justify-center items-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text className="color-white  mb-5 text-3xl font-[500] font-exoExtraBold">
          DEVLAB
        </Text>
      </View>

      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <View className="h-[590px] rounded-3xl  w-[25rem]  bg-accent flex-col">
          <View className="flex-[1] justify-center items-center">
            <Ionicons
              name="person-circle"
              size={120}
              color={"#314A70"}
              className="mx-auto my-2"
            />
          </View>
          {/* Input fields for registration */}
          <View className="flex-[2] justify-center items-center">
            <InputBox
              placeHolder={"Email"}
              value={state.email}
              setValue={(text) =>
                dispatch({ type: "UPDATE_FIELD", field: "email", value: text })
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
              placeHolder={"ConfirmPassword"}
              value={state.confirmPassword}
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
            <InputBox
              placeHolder={"Age"}
              value={state.age}
              setValue={(text) =>
                dispatch({ type: "UPDATE_FIELD", field: "age", value: text })
              }
              icon={"calendar-outline"}
            />
          </View>

          <View className="flex-[.5]  justify-center items-center ">
            <TouchableOpacity
              className="bg-button flex-[1] w-[8rem] justify-center items-center my-2 rounded-full "
              onPress={() => {
                handleRegister();
                setVisibility((prev) => !prev);
              }}
            >
              <Text className="color-white text-lg font-exoRegular">
                REGISTER
              </Text>
            </TouchableOpacity>
          </View>
          {/* Text to navigate to login page */}
          <View className="flex-[1]  justify-center items-center">
            <Text className="mt-7 color-[#FFFFFE] font-exoRegular">
              Already have an Account?
            </Text>
            {/* Routes user to login (index) */}
            <TouchableOpacity onPress={() => router.replace("/")}>
              <Text className="color-[#4F80C5] mt-2 font-exoRegular">
                Login here
              </Text>
            </TouchableOpacity>
          </View>

          {visibility && (
            <OnSuccessRegisterModal
              visibility={visibility}
              scaleStyle={scaleStyle}
              closeModal={closeModal}
            ></OnSuccessRegisterModal>
          )}
        </View>
      </TouchableNativeFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;
