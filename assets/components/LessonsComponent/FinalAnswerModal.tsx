import { ScaleModalProps } from "@/assets/constants/type";
import { Modal, Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const FinalAnswerModal = ({
  closeModal,
  visibility,
  scaleStyle,
  onConfirm,
}: ScaleModalProps) => {
  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable onPress={closeModal} className="flex-1 bg-black/50 z-10">
        <Animated.View
          style={[scaleStyle]}
          className="   aspect-square w-3/4 m-auto  rounded-xl z-50 "
        >
          <View className="justify-center items-center flex-[1] bg-modal border-[#6c37a5] border-[1px] rounded-xl">
            <View className="flex-[1] justify-center items-center">
              <Text className="text-white text-center font-exoBold xs:text-xs">
                Is this your final answer?
              </Text>
            </View>
            <View className="flex-[1] w-full flex-row  p-2 justify-evenly items-center">
              <Pressable onPress={onConfirm}>
                <Text className="text-white py-2 px-7 font-exoBold self-start xs:text-[8px] bg-[#7F5AF0] rounded-2xl">
                  Continue
                </Text>
              </Pressable>
              <Pressable onPress={closeModal}>
                <Text className="text-white py-2 px-7 font-exoBold self-start xs:text-[8px]  bg-[#FF6166] rounded-2xl">
                  No
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default FinalAnswerModal;
