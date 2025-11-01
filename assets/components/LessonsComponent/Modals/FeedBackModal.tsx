import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
type FeedBackModalPayload = ScaleModalPayload & {
  feedbackArray: any;
};
const FeedBackModal = ({
  visibility,
  scaleStyle,

  closeModal,
  feedbackArray,
}: FeedBackModalPayload) => {
  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable className="flex-1 bg-black/50 z-50">
        <Animated.View
          style={[scaleStyle]}
          className="  w-3/4 m-auto  rounded-[10px]"
        >
          <View className=" py-3 bg-modal rounded-xl border-[#2a3141] border-[1px] z-50">
            <View className="justify-center items-center  my-3 ">
              <Text className="text-white text-center font-exoBold xs:text-xs ">
                Previous evaluation
              </Text>
              <TouchableOpacity
                onPress={closeModal}
                className="absolute right-8"
              >
                <Ionicons name={"close"} size={20} color={"white"}></Ionicons>
              </TouchableOpacity>
            </View>

            <View className=" m-auto mx-3 bg-[#080c15] py-5 border-[#2a3141] border-[1px] rounded-2xl items-center">
              <Text className="text-white  font-exoBold xs:text-xs text-justify px-3">
                {feedbackArray.feedback}
              </Text>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default FeedBackModal;

const styles = StyleSheet.create({});
