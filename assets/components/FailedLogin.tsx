import { fontFamily } from "@/fontFamily/fontFamily";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type failedLoginProps = {
  show: boolean;
  closeModal: () => void;
};

const FailedLogin = ({ show, closeModal }: failedLoginProps) => {
  return (
    <Modal transparent={true} animationType="fade" visible={show}>
      <View className="bg-accentContainer rounded-xl h-[350px] w-1/2  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <View className="flex-[2] justify-center items-center">
          <Ionicons name="sad" size={100} color={"#FFFFFF"} />
        </View>

        <View className="flex-[1] justify-center items-center">
          <Text
            className="text-white text-center p-3"
            style={{ fontFamily: fontFamily.ExoBold }}
          >
            Your login credentials does not match{" "}
          </Text>
        </View>

        <View className="flex-[1] justify-center items-center ">
          <TouchableOpacity
            className="bg-button py-3 px-3 rounded-3xl"
            onPress={() => closeModal()}
          >
            <Text
              className="text-white "
              style={{ fontFamily: fontFamily.ExoBold }}
            >
              Try again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FailedLogin;

const styles = StyleSheet.create({});
