import tryCatch from "@/assets/Hooks/function/tryCatch";
import toastHandler from "@/assets/zustand/toastHandler";
import { auth } from "@/constants";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import InputBox from "../InputBox";

const ForgotPasswordModal = ({
  visibility,
  scaleStyle,
  closeModal,
}: ScaleModalPayload) => {
  const [email, setEmail] = useState<string>("");
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);
  const handleForgotPassword = async (email: string) => {
    if (email === "") {
      setToastVisibility("emptyCredentialField", "Fill in your credentials!");
      return;
    }
    //Custom tryCatch

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
          <View className="bg-modal rounded-3xl px-6 py-6">
            <Text className="text-white text-center font-exoBold text-lg mb-2">
              Reset Password
            </Text>
            <Text className="text-white/70 text-center font-exoRegular text-xs mb-6">
              Enter your email address and we'll send you a link to reset your
              password.
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
              <Text className="text-center text-white font-exoBold  bg-button px-7 py-2 xs: text-xs sm:text-base md:lg my-5 rounded-2xl">
                Send to email
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};
export default React.memo(ForgotPasswordModal);
