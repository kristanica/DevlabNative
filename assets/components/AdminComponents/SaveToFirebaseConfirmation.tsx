import LottieView from "lottie-react-native";
import React from "react";
import {
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";
type SaveToFirebaseConfirmation = {
  visibility: boolean;
  scaleStyle: AnimatedStyle<ViewStyle>;
  closeModal: () => void;
  state: any;
};

const SaveToFirebaseConfirmation = ({
  visibility,
  scaleStyle,
  closeModal,
  state,
}: SaveToFirebaseConfirmation) => {
  return (
    <Modal visible={visibility} transparent={true}>
      <Pressable
        className="flex-[1] justify-center items-center"
        onPress={closeModal}
      >
        <Pressable
          className="w-[70%] h-[30%]"
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <Animated.View
            className="  bg-accent  border-[2px] h-full border-[#56EBFF]"
            style={[scaleStyle]}
          >
            <Text className="text-white font-exoBold mx-auto mt-3 ">
              Are you sure you want to save this?
            </Text>

            <LottieView
              source={require("@/assets/Lottie/Loading.json")}
              autoPlay
              loop
              style={{ flex: 1 }}
            ></LottieView>
            <View className="flex-row justify-evenly items-center mb-3">
              <TouchableOpacity
                onPress={() => {
                  if (
                    state.title === "" ||
                    state.description === "" ||
                    state.codingInterface === ""
                  ) {
                    console.log("ONe of the fiels is empty");
                  } else {
                    console.log("hello");
                  }
                }}
              >
                <Text className="px-7 py-2 self-start bg-green-400 text-white  rounded-2xl font-exoBold">
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <Text className="px-7 py-2 self-start bg-red-400 text-white  rounded-2xl font-exoBold">
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default SaveToFirebaseConfirmation;

const styles = StyleSheet.create({});
