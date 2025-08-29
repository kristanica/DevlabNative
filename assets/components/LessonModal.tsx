import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { ScaleModalProps } from "../constants/type";
import LessonsContainer from "./LessonsContainer";
const mock = ["Html", "Css", "JavaScript", "Database"];
const LessonModal = ({
  visibility,
  closeModal,
  onConfirm,
  scaleStyle,
}: ScaleModalProps) => {
  return (
    <Modal visible={visibility} animationType="slide" transparent={true}>
      <Pressable onPress={closeModal} className="flex-1 bg-black/50">
        <View className="   w-full absolute bottom-0 h-[50%] ">
          <View className="justify-center  flex-[1] bg-background  rounded-3xl">
            <View className="flex-col mx-2 flex-[1.5] px-2 py-3">
              <Pressable
                onPress={() =>
                  router.replace({ pathname: "/(user)/playground/Coding" })
                }
                className="flex-row"
              >
                <Ionicons name={"logo-css3"} size={50} color={"white"} />
                <View className="flex-col justify-center">
                  <Text className="text-white font-exoBold xs:text-sm">
                    Coding Playground
                  </Text>
                  <Text className="text-[#CFEFFF]  font-exoRegular xs:text-xs">
                    Try HTML/CSS/JS
                  </Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() =>
                  router.replace({ pathname: "/(user)/playground/Database" })
                }
                className="flex-row mt-3"
              >
                <Ionicons name={"cube"} size={50} color={"white"} />
                <View className="flex-col justify-center">
                  <Text className="text-white font-exoBold xs:text-sm">
                    Database Playground
                  </Text>
                  <Text className="text-[#CFFFE0] font-exoRegular text-sm">
                    Try HTML/CSS/JS
                  </Text>
                </View>
              </Pressable>

              {mock.map((item, index) => (
                <LessonsContainer key={index} name={item} />
              ))}
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default LessonModal;

const styles = StyleSheet.create({});
