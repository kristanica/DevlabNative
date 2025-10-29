import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import AdminLoginForm from "@/assets/components/screen/ADMINLOGIN/AdminLoginForm";
import useAdminLogin from "@/assets/Hooks/reducers/useAdminLogin";
import toastHandler from "@/assets/zustand/toastHandler";

import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, { FadeIn } from "react-native-reanimated";

const AdminLogin = () => {
  const { state, dispatch, adminLogin } = useAdminLogin();
  const handleAdminLogin = async () => {
    const result = await adminLogin();

    if (result) {
      setToastVisibility(result[0], result[1]);
    }
  };
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
            {/* <Logo></Logo> */}
            <AdminLoginForm
              state={state}
              dispatch={dispatch}
              handleAdminLogin={handleAdminLogin}
            ></AdminLoginForm>
          </KeyboardAwareScrollView>
        </CustomGeneralContainer>
      </Animated.View>
    </View>
  );
};

export default AdminLogin;
