import { auth } from "@/assets/constants/constants";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import toastHandler from "@/assets/zustand/toastHandler";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import InputBox from "../InputBox";

type ForgotPasswordProps = {
  visibility: boolean;
  scaleStyle: AnimatedStyle<ViewStyle>;
  closeModal: () => void;
};

const ForgotPasswordModal = ({
  visibility,
  scaleStyle,
  closeModal,
}: ForgotPasswordProps) => {
  const [email, setEmail] = useState<string>("");
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);
  const handleForgotPassword = async (email: string) => {
    if (email === "") {
      setToastVisibility("emptyCredentialField", "Fill in your credentials!");
      return;
    }

    const [_, error] = await tryCatch(sendPasswordResetEmail(auth, email));

    if (error) {
      console.log(error);
      closeModal();
      setToastVisibility("error", "something went wrong");

      return;
    }
    closeModal();

    setToastVisibility("success", "Password has been reset!");
  };
  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable onPress={closeModal} className="flex-1">
        <Animated.View
          className="   w-[250px] h-[200px] m-auto rounded-[10px] "
          style={[scaleStyle]}
        >
          <View className="justify-center items-center flex-[1] bg-modal rounded-3xl px-5">
            <Text className="text-white text-center font-exoBold text-xs">
              Forgot password
            </Text>

            <View>
              <InputBox
                icon={"person"}
                placeHolder={"Email"}
                value={email}
                setValue={(text) => setEmail(text)}
                isPassword={false}
              ></InputBox>
            </View>

            <TouchableOpacity onPress={() => handleForgotPassword(email)}>
              <Text className="text-white font-exoBold  bg-button px-7 py-2 xs: text-xs sm:text-base md:lg my-5 rounded-2xl">
                Send to email
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};
export default ForgotPasswordModal;
