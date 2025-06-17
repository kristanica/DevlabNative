import { FIREBASE_AUTH } from "@/firebaseConfig";
import { fontFamily } from "@/fontFamily/fontFamily";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import ButtonAnimated from "./ButtonComponent";

type signOutProps = {
  setVisibility: (val: boolean) => void;
};

const SignOutModal = ({ setVisibility }: signOutProps) => {
  const auth = FIREBASE_AUTH;
  const out = async () => {
    try {
      await AsyncStorage.removeItem("isLoggin");
      closeModal();
      await signOut(auth);
      router.replace("/");
    } catch {
      alert("Something went wrong....");
    }
  };

  const scaleVal = useSharedValue<number>(0);
  const opacityVal = useSharedValue<number>(0);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleVal.value }],
    opacity: opacityVal.value,
  }));

  useEffect(() => {
    scaleVal.value = withSpring(1, {
      damping: 100,
    });
    opacityVal.value = withTiming(1, { duration: 100 });
    return () => {
      scaleVal.value = 0;
      opacityVal.value = 0;
    };
  }, []);

  const closeModal = () => {
    opacityVal.value = withTiming(0, { duration: 200 });
    scaleVal.value = withSpring(0);

    setTimeout(() => {
      setVisibility(false);
    }, 200);
  };

  return (
    <Modal visible={true} animationType="none" transparent={true}>
      <Animated.View
        style={[scaleStyle]}
        className="   w-[250px] h-[300px] m-auto bg-[#2C2C2E] rounded-[10px]"
      >
        <View className="justify-center items-center flex-[1] bg-[#2C2C2E] rounded-3xl">
          <LottieView
            source={require("@/assets/Lottie/Sad Signout.json")}
            loop
            autoPlay
            style={{
              height: 200,
              width: 200,
              flex: 3,

              marginTop: 10,
            }}
          />
          <View className="flex-[1] justify-center items-center">
            <Text
              className="text-white text-center"
              style={{ fontFamily: fontFamily.ExoBold }}
            >
              Are you sure you want to sign out?
            </Text>
          </View>
          <View className="flex-[1] w-full flex-row  p-2 justify-evenly items-center">
            <ButtonAnimated
              height={30}
              width={100}
              backgroundColor={"#7F5AF0"}
              onPressAction={out}
            >
              <Text
                className="text-white"
                style={{ fontFamily: fontFamily.ExoBold }}
              >
                Continue
              </Text>
            </ButtonAnimated>
            <ButtonAnimated
              height={30}
              width={100}
              backgroundColor={"#FF6166"}
              onPressAction={closeModal}
            >
              <Text
                className="text-white"
                style={{ fontFamily: fontFamily.ExoBold }}
              >
                No
              </Text>
            </ButtonAnimated>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default SignOutModal;

const styles = StyleSheet.create({});
