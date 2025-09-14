import { ScaleModalProps } from "@/assets/constants/type";
import { Modal, Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";
type EvaluateMoalProps = ScaleModalProps & {
  gptResponse: any;
};

const EvaluateModal = (props: EvaluateMoalProps) => {
  return (
    <Modal visible={props.visibility} animationType="none" transparent={true}>
      <Pressable onPress={props.closeModal} className="flex-1">
        <Animated.View
          style={[props.scaleStyle]}
          className="   aspect-square w-3/4 m-auto  rounded-[10px]"
        >
          <View className="justify-center items-center flex-[1] bg-background rounded-3xl">
            <View className="flex-[1] justify-center items-center">
              <Text className="text-white text-center font-exoBold xs:text-xs">
                {props.gptResponse}
              </Text>
            </View>
            <View className="flex-[1] w-full flex-row  p-2 justify-evenly items-center">
              <Pressable onPress={props.onConfirm}>
                <Text className="text-white py-2 px-7 font-exoBold self-start xs:text-[8px] bg-[#7F5AF0] rounded-2xl">
                  Continue
                </Text>
              </Pressable>
              <Pressable onPress={props.closeModal}>
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

export default EvaluateModal;
