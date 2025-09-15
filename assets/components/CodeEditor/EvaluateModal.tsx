import { ScaleModalProps } from "@/assets/constants/type";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
type EvaluateMoalProps = ScaleModalProps & {
  gptResponse: any;
};

const EvaluateModal = (props: EvaluateMoalProps) => {
  const [flipped, setFlipped] = useState<boolean>(false);

  const rotate = useSharedValue(0);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotateY: `${rotate.value}deg`,
      },
    ],
    backfaceVisibility: "hidden",
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotateY: `${rotate.value + 180}deg`,
      },
    ],
    backfaceVisibility: "hidden",
  }));

  const flipCard = () => {
    if (flipped) {
      rotate.value = withTiming(0, { duration: 500 });
      setFlipped(false);
    } else {
      rotate.value = withTiming(180, { duration: 500 });
      setFlipped(true);
    }
  };

  return (
    <Modal visible={props.visibility} animationType="none" transparent={true}>
      <Pressable onPress={props.closeModal} className="flex-1">
        <LottieView
          source={require("@/assets/Lottie/Confetti.json")}
          loop={false}
          autoPlay
          style={[StyleSheet.absoluteFillObject]}
        />
        <Animated.View
          style={[props.scaleStyle]}
          className="   aspect-square w-3/4 m-auto  rounded-[10px]"
        >
          <View className="justify-center border-[#2a3141] border-[1px] items-center flex-[1] bg-background rounded-3xl px-5">
            <View className="flex-[1] mt-6 justify-center items-center ">
              <Text className="text-white font-exoBold text-xl m-auto">
                {props.gptResponse.evaluation
                  ? "🎉 Correct 🎉"
                  : "❌ Maybe change something ❌ "}
              </Text>
              <Image
                source={require("@/assets/images/catGif.gif")}
                className="aspect-[2] h-[100px] rounded-xl"
              ></Image>
            </View>

            <Pressable
              onPress={flipCard}
              className="relative flex-[1] w-full h-36  my-6"
            >
              <Animated.View
                style={frontStyle}
                className="bg-accent  border-[#21b3cf] border-[1px] absolute w-full  h-full rounded-2xl"
              >
                <Text className="text-white mx-auto mt-5 text-justify px-2 font-exoBold xs:text-xs ">
                  Feedback
                </Text>
                <Text className="text-white m-auto text-justify px-2 font-exoBold xs:text-xs ">
                  {props.gptResponse.feedback}
                </Text>
              </Animated.View>

              <Animated.View
                style={backStyle}
                className="bg-accent  absolute w-full h-full border-[#21b3cf] border-[1px] rounded-2xl"
              >
                <Text className="text-white mx-auto mt-5 text-justify px-2 font-exoBold xs:text-xs ">
                  Suggesions
                </Text>
                <Text className="text-white m-auto text-justify px-2 font-exoBold xs:text-xs">
                  {props.gptResponse.suggestion}
                </Text>
              </Animated.View>
            </Pressable>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default EvaluateModal;
{
  /* <Modal visible={props.visibility} animationType="none" transparent={true}>
      <Pressable onPress={props.closeModal} className="flex-1">
        <Animated.View
          style={[props.scaleStyle]}
          className="   aspect-square w-3/4 m-auto  rounded-[10px]"
        >
          <View className="justify-center items-center flex-[1] bg-background rounded-3xl">
            <View className="flex-[1] justify-center items-center">
              <Text className="text-white text-center font-exoBold xs:text-xs">
                {props.gptResponse.evaluation === "Correct" ? (
                  <Text>🎉Correct!🎉</Text>
                ) : (
                  <Text>❌That was a nice try❌</Text>
                )}

                {props.gptResponse.evaluation}
              </Text>

              <Pressable onPress={flipCard}>
                <Animated.View
                  style={frontStyle}
                  className="bg-red-300 absolute"
                >
                  <Text className="text-white text-center font-exoBold xs:text-xs">
                    {props.gptResponse.feedback}
                  </Text>
                </Animated.View>

                <Animated.View
                  style={backStyle}
                  className="bg-blue-300 absolute"
                >
                  <Text className="text-white text-center font-exoBold xs:text-xs">
                    {props.gptResponse.suggestion}
                  </Text>
                </Animated.View>
              </Pressable>
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
    </Modal> */
}
