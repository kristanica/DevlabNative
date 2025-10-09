import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import InputBox from "@/assets/components/InputBox";
import useAdminLogin from "@/assets/Hooks/reducers/useAdminLogin";
import toastHandler from "@/assets/zustand/toastHandler";

import Ionicons from "@expo/vector-icons/build/Ionicons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, { FadeIn } from "react-native-reanimated";

const AdminLogin = () => {
  const { state, dispatch, adminLogin } = useAdminLogin();
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);
  return (
    <View style={{ flex: 1 }} className="bg-background">
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
            <View className="flex-1 bg-background justify-center items-center">
              <View className="flex-col justify-center items-center ">
                <Image
                  source={require("@/assets/images/devlabIcon/devlab-icon-transparent.png")}
                  className="w-[100px] h-[50px]  "
                ></Image>
                <Text className="color-white  flex justify-center items-center mb-5 text-3xl font-[500] font-exoExtraBold ">
                  DEVLAB
                </Text>
              </View>

              <View className=" rounded-3xl  bg-accent flex-col w-3/4  aspect-[1/2] ">
                <View className=" flex-[1]  justify-center items-center">
                  <Ionicons name="person-circle" size={140} color={"#314A70"} />
                </View>

                <View className=" flex-[1] justify-center items-center  px-3">
                  <InputBox
                    icon={"person"}
                    placeHolder={"email"}
                    value={state.email}
                    setValue={(text) =>
                      dispatch({
                        type: "UPDATE_FIELD_ADMIN",
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
                        type: "UPDATE_FIELD_ADMIN",
                        field: "password",
                        value: text,
                      })
                    }
                    isPassword={true}
                  />
                  <TouchableOpacity
                    className="bg-button  justify-center items-center my-16 py-2 px-7 rounded-full "
                    onPress={async () => {
                      const result = await adminLogin();

                      if (result) {
                        setToastVisibility(result[0], result[1]);
                      }
                    }}
                  >
                    <Text className="color-white text-sm font-exoBold">
                      LOGIN
                    </Text>
                  </TouchableOpacity>
                  <Text className="color-[#FFFFFE] font-exoRegular xs: text-xs">
                    {"Not an administrator?"}
                  </Text>
                  <Pressable
                    onPress={() => {
                      router.replace({ pathname: "/Login" });
                    }}
                  >
                    <Text className=" color-[#4F80C5] -2 font-exoRegula xs:text-xs ">
                      Back to user login
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </CustomGeneralContainer>
      </Animated.View>
    </View>
  );
};

export default AdminLogin;
