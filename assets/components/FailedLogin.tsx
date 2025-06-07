import { fontFamily } from "@/fontFamily/fontFamily";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
type failedLoginProps = {
  show: boolean;
  closeModal: () => void;
};

const FailedLogin = ({ show, closeModal }: failedLoginProps) => {
  return (
    <Modal transparent={true} animationType="slide" visible={show}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View className="justify-end items-end flex-1">
          <View className="justify-evenly items-center  bg-[#E53935] w-full h-[80px] flex-row">
            <View className="flex-[.5] justify-center items-center">
              <Ionicons name="sad" size={20} color={"#FFFFFF"} />
            </View>

            <View className="flex-[2] justify-center items-center">
              <Text
                className="text-white text-lg"
                style={{ fontFamily: fontFamily.ExoBold }}
              >
                Your login credentials does not match
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FailedLogin;

const styles = StyleSheet.create({});
