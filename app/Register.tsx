import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import FillScreenLoading from "@/assets/components/global/FillScreenLoading";
import RegisterForm from "@/assets/components/screen/REGISTER/RegisterForm";
import CheckEmptyFields from "@/assets/Hooks/function/CheckEmptyFields";
import useRegister from "@/assets/Hooks/reducers/useRegister";

import toastHandler from "@/assets/zustand/toastHandler";
import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, { FadeIn } from "react-native-reanimated";

const Register = () => {
  //custom hook
  const { state, dispatch, handleRegister } = useRegister();
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);

  const registerUser = async () => {
    const hasEmpty = CheckEmptyFields(state, "Register");

    if (hasEmpty) {
      setToastVisibility(
        "emptyCredentialField",
        "Fill in the following credentials!"
      );
      return;
    }
    const result = await handleRegister();
    if (!result) {
      setToastVisibility("error", "Registration failed. Please try again.");
      return;
    }

    setToastVisibility(result![0], result![1]);
  };

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
              <FillScreenLoading text="Registering..."></FillScreenLoading>
            )}
            <RegisterForm
              state={state}
              dispatch={dispatch}
              handleRegister={registerUser}
            ></RegisterForm>
          </KeyboardAwareScrollView>
        </CustomGeneralContainer>
      </Animated.View>
    </View>
  );
};

export default Register;
