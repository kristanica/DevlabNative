import { fontFamily } from "@/fontFamily/fontFamily";
import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

const SampleLoading = () => {
  return (
    <Modal animationType="fade" visible={true} transparent={true}>
      <View className="h-[350px] w-1/2  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-transparent">
        <View className=" flex-1  bg-accentContainer justify-center items-center">
          <Text
            className="text-white"
            style={{ fontFamily: fontFamily.ExoBold }}
          >
            You shit is loading
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default SampleLoading;

const styles = StyleSheet.create({});
