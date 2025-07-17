import InputBox from "@/assets/components/InputBox";
import OnFailedLogin from "@/assets/components/LoginComponents/OnFailedLogin";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import useAdminLogin from "@/assets/Hooks/useAdminLogin";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const AdminLogin = () => {
  const { state, dispatch, adminLogin } = useAdminLogin();
  const [trigger, setTrigger] = useState<boolean>(false);
  return (
    <ProtectedRoutes>
      <KeyboardAvoidingView
        className="flex-1 bg-background justify-center items-center"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Animated.View
          className="justify-center items-center"
          entering={FadeIn.duration(500)}
        >
          <Text className="color-white  mb-5 text-3xl font-exoExtraBold">
            DEVLAB
          </Text>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <OnFailedLogin trigger={trigger}>
              <Animated.View className="h-[500px] rounded-3xl  bg-accent flex-col w-[25rem] ">
                <View className=" flex-[1]  justify-center items-center">
                  <Ionicons name="person-circle" size={200} color={"#314A70"} />
                </View>

                <View className=" flex-[1] justify-center items-center  ">
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
                    onPress={() => {
                      adminLogin(() => {
                        setTrigger(true);
                      });
                      setTrigger(false);
                    }}
                  >
                    <Text className="color-white text-lg font-exoBold">
                      LOGIN
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </OnFailedLogin>
          </TouchableWithoutFeedback>
        </Animated.View>
      </KeyboardAvoidingView>
    </ProtectedRoutes>
  );
};

export default AdminLogin;
