import { ScaleModalProps } from "@/assets/constants/type";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const CodeRushModal = ({
  visibility,
  scaleStyle,
  closeModal,
  onConfirm,
}: ScaleModalProps) => {
  return (
    <Modal visible={visibility} animationType="fade" transparent={true}>
      <Pressable onPress={closeModal} className="flex-1 bg-black/50">
        <Animated.View
          style={[scaleStyle]}
          className="aspect-square w-5/6 max-w-[350px] m-auto rounded-3xl shadow-2xl shadow-black/80"
        >
          <View className="flex-1 bg-[#16161A] border border-[#7F5AF0]/40 rounded-3xl p-5 justify-center items-center">
            <Text className="text-white font-exoBold xs:text-sm text-justify">
              Welcome to Code Rush — a high-speed coding challenge where every
              second counts!
            </Text>
            <Text className="text-white font-exoBold xs:text-sm">
              ⏰ You’ll be given a task to complete before time runs out
            </Text>
            <Text className="text-white font-exoBold xs:text-sm">
              💻 Write and run your code as quickly and accurately as you can
            </Text>
            <Text className="text-white font-exoBold xs:text-sm">
              🚀 The faster you finish, the higher your score!
            </Text>
            <Text className="text-white font-exoBold xs:text-sm mt-2">
              It’s all about focus, quick thinking, and keeping your cool under
              pressure — can you beat the clock?
            </Text>
            {/* <View className="flex-[1] w-full flex-row p-2 justify-evenly items-center">
                 <Pressable onPress={onConfirm}>
                   <Text className="text-white py-2 px-7 font-exoBold self-start xs:text-[8px] bg-[#7F5AF0] rounded-2xl">
                     Continue
                   </Text>
                 </Pressable>
               </View> */}
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default React.memo(CodeRushModal);

const styles = StyleSheet.create({});
