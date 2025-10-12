import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
type JumpBackInPayload = {
  handleJumpBackIn: any;
};
const JumpBackIn = ({ handleJumpBackIn }: JumpBackInPayload) => {
  return (
    <>
      <Text className="text-white ml-2  xs:text-lg mt-3 font-exoBold">
        JUMP BACK IN
      </Text>

      {/* Routes to last  lesson viewed */}
      <Pressable onPress={handleJumpBackIn}>
        <View className="bg-accentContainer mx-3 my-2 flex-row rounded-2xl overflow-hidden">
          <View className="flex-[.5] justify-center items-center bg-[#070606] rounded-2xl">
            <Ionicons name="logo-html5" size={50} color={"white"} />
          </View>

          <View className="flex-1 overflow-hidden p-2 ">
            <Text className="text-white xs:text-sm font-exoBold">
              HTML Explorer - The Foundation
            </Text>

            <Text
              className="text-[#94A1B2] text-xs text-justify font-exoLight"
              numberOfLines={3}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos, voluptates laudantium sint error deleniti aliquid
              quasi maiores suscipit a maxime voluptatibus nemo laborum dicta
              harum totam explicabo temporibus ut facilis?
            </Text>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default React.memo(JumpBackIn);

const styles = StyleSheet.create({});
