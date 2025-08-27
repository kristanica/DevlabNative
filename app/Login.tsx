import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import InputBox from "@/assets/components/InputBox";
import OnFailedLogin from "@/assets/components/LoginComponents/OnFailedLogin";
import useKeyBoardHandler from "@/assets/Hooks/useKeyBoardHandler";
import useLogin from "@/assets/Hooks/useLogin";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, { FadeIn } from "react-native-reanimated";
const Login = () => {
  //custom hook
  const { state, dispatch, signIn } = useLogin();
  //incorrect animation state
  const [trigger, setTrigger] = useState<boolean>(false);
  const { keyBoardHandlingStyle } = useKeyBoardHandler();

  return (
    <View className="flex-1 bg-background ">
      <Animated.View entering={FadeIn.duration(500)} style={{ flex: 1 }}>
        <CustomGeneralContainer>
          <View className="flex-1 justify-center items-center ">
            <Text className="color-white  mb-5 text-3xl font-[500] font-exoExtraBold">
              DEVLAB
            </Text>

            <Animated.View
              className="w-3/4 aspect-[1/2] rounded-3xl bg-accent flex-col items-center justify-center "
              style={[keyBoardHandlingStyle]}
            >
              <OnFailedLogin trigger={trigger}>
                <View className=" justify-center items-center  h-[100%] w-[100%]">
                  <View className="">
                    <Ionicons
                      name="person-circle"
                      size={140}
                      color={"#314A70"}
                    />
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

                  <View className="flex-row">
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
                    <Text className=" text-white opacity-20 xs:text-xs font-exoRegular">
                      Keep me signed in
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      signIn(() => {
                        setTrigger(true);
                      });
                      setTrigger(false);
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
                    <Text className="color-[#4F80C5] mt-2 font-exoRegula xs:text-xs">
                      Register here
                    </Text>
                  </TouchableOpacity>
                </View>
              </OnFailedLogin>
            </Animated.View>
          </View>
        </CustomGeneralContainer>
      </Animated.View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0,
  },
});
