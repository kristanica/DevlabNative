import { router } from "expo-router";
import React from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScaleModalProps } from "../constants/type";
import LessonsContainer from "./LessonsContainer";
const mock = ["Html", "Css", "JavaScript", "Database"];
const LessonModal = ({ visibility, closeModal }: ScaleModalProps) => {
  return (
    <Modal visible={visibility} animationType="slide" transparent={true}>
      <Pressable onPress={closeModal} className="flex-1 bg-black/50">
        <View className="   w-full absolute bottom-0 h-[65%] ">
          <View className="justify-center  flex-[1] bg-modal border-b-0  rounded-3xl rounded-bl-none rounded-br-none border-[#2a3141] border-[1px]  border-t-[2px] ">
            <View className="flex-col mx-2 flex-[1.5] px-2 py-3 justify-evenly">
              <TouchableOpacity
                onPress={() =>
                  router.replace({
                    pathname: "/(user)/playground/CodingPlayground",
                  })
                }
                className="flex-row"
              >
                <Image
                  source={require("@/assets/images/lessonIcons/codePlayground.png")}
                  className="h-[50px] w-[50px]"
                ></Image>
                <View className="flex-col justify-center ml-4">
                  <Text className="text-white font-exoBold text-lg xs:text-[12px]">
                    Coding Playground
                  </Text>
                  <Text className="text-white  font-exoRegular xs:text-[8px] opacity-50">
                    Try HTML/CSS/JS
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  router.replace({
                    pathname: "/(user)/playground/DatabasePlayground",
                  })
                }
                className="flex-row mt-3"
              >
                <Image
                  source={require("@/assets/images/lessonIcons/DbPlayground.png")}
                  className="h-[50px] w-[50px]"
                ></Image>
                <View className="flex-col justify-center ml-4">
                  <Text className="text-white font-exoBold  text-lg xs:text-[12px]">
                    Database Playground
                  </Text>
                  <Text className="text-white  font-exoRegular xs:text-[8px] opacity-50">
                    Try Database Querying
                  </Text>
                </View>
              </TouchableOpacity>

              {mock.map((item, index) => (
                <LessonsContainer
                  key={index}
                  closeModal={closeModal}
                  name={item}
                  index={index}
                />
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
