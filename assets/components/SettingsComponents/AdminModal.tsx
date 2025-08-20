import LottieView from "lottie-react-native";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import ButtonAnimated from "../ButtonComponent";

type adminModalProps = {
  visibility: boolean;
  scaleStyle: AnimatedStyle<ViewStyle>;
  closeModal: () => void;
  onConfirm: () => void;
};

const AdminModal = ({
  visibility,
  scaleStyle,
  closeModal,
  onConfirm,
}: adminModalProps) => {
  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable onPress={closeModal} className="flex-1">
        <Animated.View
          style={[scaleStyle]}
          className="   w-[250px] h-[300px] m-auto bg-[#2C2C2E] rounded-[10px]"
        >
          <View className="justify-center items-center flex-[1] bg-[#2C2C2E] rounded-3xl">
            <LottieView
              source={require("@/assets/Lottie/Admin Login.json")}
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
              <Text className="text-white text-center font-exoBold">
                Your'e about to be redirected to admin view
              </Text>
            </View>
            <View className="flex-[1] w-full flex-row  p-2 justify-evenly items-center">
              <ButtonAnimated
                backgroundColor={"#7F5AF0"}
                onPressAction={onConfirm}
              >
                <Text className="text-white py-2 px-10 font-exoBold">
                  Continue
                </Text>
              </ButtonAnimated>
              <ButtonAnimated
                backgroundColor={"#FF6166"}
                onPressAction={closeModal}
              >
                <Text className="text-white py-2 px-10 font-exoBold">No</Text>
              </ButtonAnimated>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default AdminModal;

const styles = StyleSheet.create({});
