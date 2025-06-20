import { fontFamily } from "@/fontFamily/fontFamily";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

import { Modal, StyleSheet, Text, View } from "react-native";

const Loading = () => {
  return (
    <Modal animationType="slide" visible={true} transparent={true}>
      <View className="justify-end items-end flex-1">
        <View className="justify-evenly items-center  bg-[#43A047] w-full h-[80px] flex-row">
          <View>
            <Ionicons name="happy" size={30} color={"#FFFFFE"}></Ionicons>
          </View>

          <View>
            <Text
              className="text-white"
              style={{ fontFamily: fontFamily.ExoBold }}
            >
              Contents are Loading.....
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({});
