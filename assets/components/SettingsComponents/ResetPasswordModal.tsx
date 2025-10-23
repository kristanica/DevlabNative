import { auth } from "@/assets/constants/constants";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import toastHandler from "@/assets/zustand/toastHandler";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import InputBox from "../InputBox";

const ResetPasswordModal = ({
  visibility,
  scaleStyle,
  closeModal,
}: ScaleModalPayload) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);
  const handleResetPassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    if (newPassword === "" || currentPassword === "") {
      setToastVisibility("emptyCredentialField", "Fill in your credentials!");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      console.log("No Authenticated user!");
      return;
    }
    const credential = EmailAuthProvider.credential(
      String(user.email),
      currentPassword
    );
    await reauthenticateWithCredential(user, credential);
    //Custom tryCatch
    const [_, error] = await tryCatch(updatePassword(user, newPassword));

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
      <Pressable onPress={closeModal} className="flex-1 bg-black/50">
        <Animated.View
          className="   w-[300px] h-[250px] m-auto rounded-[10px] "
          style={[scaleStyle]}
        >
          <View className="justify-center items-center flex-[1]  border-[#2a3141] border-[1px] bg-modal rounded-3xl px-5">
            <Text className="text-white text-center font-exoBold text-lg mb-2">
              FORGOT PASSWORD
            </Text>
            <Text className="text-white/60 text-center font-exoRegular text-xs mb-6">
              Enter your current and new password and we'll send you a link to
              reset your password.
            </Text>
            <View>
              <InputBox
                icon={"lock-closed"}
                placeHolder={"Current password"}
                value={currentPassword}
                setValue={(text) => setCurrentPassword(text)}
                isPassword={true}
              ></InputBox>
              <InputBox
                icon={"lock-closed"}
                placeHolder={"New password"}
                value={newPassword}
                setValue={(text) => setNewPassword(text)}
                isPassword={true}
              ></InputBox>
            </View>

            <TouchableOpacity
              onPress={() => handleResetPassword(currentPassword, newPassword)}
            >
              <Text className="text-white font-exoBold  bg-button px-7 py-2 xs: text-xs sm:text-base md:lg my-5 rounded-2xl">
                Set new Password
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default ResetPasswordModal;
