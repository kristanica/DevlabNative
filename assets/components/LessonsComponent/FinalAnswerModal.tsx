import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

const FinalAnswerModal = ({
  closeModal,
  visibility,
  scaleStyle,
  onConfirm,
}: ScaleModalPayload) => {
  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable
        onPress={(e) => e.stopPropagation()}
        className="flex-1 bg-black/50 z-10"
      >
        <Animated.View
          style={[scaleStyle]}
          className="   w-3/4 m-auto  rounded-xl z-50 "
        >
          <View className="py-7 bg-modal border-[#2a3141] border-[1px] rounded-xl">
            <Text className="text-white text-center font-exoBold xs:text-xs">
              Is this your final answer?
            </Text>

            <View className="w-full flex-row  p-2 justify-evenly items-center mt-5">
              <TouchableOpacity onPress={onConfirm}>
                <Text className="text-white py-2 px-7 font-exoBold self-start xs:text-[8px] bg-[#7F5AF0] rounded-2xl">
                  Continue
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <Text className="text-white py-2 px-7 font-exoBold self-start xs:text-[8px]  bg-[#FF6166] rounded-2xl">
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default FinalAnswerModal;
