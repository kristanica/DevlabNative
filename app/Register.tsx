import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import InputBox from "@/assets/components/InputBox";
import OnSuccessRegisterModal from "@/assets/components/RegisterComponents/OnSuccessRegisterModal";
import CheckEmptyFields from "@/assets/Hooks/function/CheckEmptyFields";
import useRegister from "@/assets/Hooks/reducers/useRegister";

import useKeyBoardHandler from "@/assets/Hooks/useKeyBoardHandler";
import useModal from "@/assets/Hooks/useModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, { FadeIn } from "react-native-reanimated";

const Register = () => {
  //custom hook
  const { state, dispatch, handleRegister } = useRegister();
  const [isSucess, setIsSuccess] = useState<boolean>(false);

  const { visibility, setVisibility, scaleStyle, closeModal } = useModal();
  const { keyBoardHandlingStyle } = useKeyBoardHandler();

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
            <View className="flex-1 justify-center items-center ">
              <Text className="color-white  mb-5 text-3xl font-[500] font-exoExtraBold">
                DEVLAB
              </Text>

              <Animated.View className="w-3/4 aspect-[1/2] rounded-3xl bg-accent flex-col items-center justify-center p-2">
                <View className="justify-center items-center">
                  <Ionicons
                    name="person-circle"
                    size={120}
                    color={"#314A70"}
                    className="mx-auto my-2"
                  />
                </View>

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
                  <TouchableOpacity
                    onPress={() => {
                      const hasEmpty = CheckEmptyFields(state, "Register");

                      if (hasEmpty) {
                        setIsSuccess(false);
                        setVisibility((prev) => !prev);
                        return;
                      }
                      handleRegister();
                      setIsSuccess(true);
                      setVisibility((prev) => !prev);
                    }}
                  >
                    <Text className="text-white font-exoBold  bg-button px-7 py-2 xs: text-xs sm:text-base md:lg my-5 rounded-2xl">
                      REGISTER
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="justify-center items-center">
                  <Text className="color-[#FFFFFE] font-exoRegular xs:text-[8px]">
                    Already have an Account?
                  </Text>

                  <TouchableOpacity onPress={() => router.replace("/")}>
                    <Text className="color-[#4F80C5] mt-2 font-exoRegula xs:text-[8px]">
                      Login here
                    </Text>
                  </TouchableOpacity>
                </View>

                {visibility && (
                  <OnSuccessRegisterModal
                    isSuccess={isSucess}
                    visibility={visibility}
                    scaleStyle={scaleStyle}
                    closeModal={closeModal}
                  ></OnSuccessRegisterModal>
                )}
              </Animated.View>
            </View>
          </KeyboardAwareScrollView>
        </CustomGeneralContainer>
      </Animated.View>
    </View>
  );
};

export default Register;
