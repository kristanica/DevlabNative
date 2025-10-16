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
  evaluationData: any;
};
const FeedBackModal = ({
  visibility,
  scaleStyle,
  onConfirm,
  closeModal,
  evaluationData,
}: FeedBackModalPayload) => {
  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable className="flex-1 bg-black/50">
        <Animated.View
          style={[scaleStyle]}
          className="  h-[30%] w-3/4 m-auto  rounded-[10px]"
        >
          <View className=" flex-[1] bg-modal rounded-xl border-[##6c37a5] border-[1px] ">
            <View className="justify-center items-center h-[20%] relative">
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

            <View className=" m-auto mx-3 h-[80%] bg-[#080c15] py-5 border-[#2a3141] border-[1px] rounded-2xl  justify-center items-center">
              <Text className="text-white text-center font-exoBold xs:text-xs">
                {evaluationData.feedback}
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
