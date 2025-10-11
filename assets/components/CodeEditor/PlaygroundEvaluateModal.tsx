import { Modal, Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type PlaygroundEvaluateModalProps = ScaleModalPayload & {
  evaluationRes: any;
};

export const PlaygroundEvaluateModal = ({
  visibility,
  scaleStyle,
  closeModal,
  onConfirm,
  evaluationRes,
}: PlaygroundEvaluateModalProps) => {
  const height = useSharedValue(0);

  const cssOpen = useSharedValue(true);
  const jsOpen = useSharedValue(true);
  const htmlOpen = useSharedValue(true);

  const getAnimatedStyle = (openValue: Animated.SharedValue<boolean>) =>
    useAnimatedStyle(() => ({
      height: withTiming(openValue.value ? 100 : 0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      }),
      opacity: withTiming(openValue.value ? 1 : 0, { duration: 200 }),
      overflow: "hidden",
    }));

  const cssStyle = getAnimatedStyle(cssOpen);
  const jsStyle = getAnimatedStyle(jsOpen);
  const htmlStyle = getAnimatedStyle(htmlOpen);

  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable onPress={closeModal} className="flex-1 bg-black/50">
        <Pressable onPress={(e) => e.stopPropagation()} className="m-auto">
          <Animated.View
            style={[scaleStyle]}
            className="rounded-[10px] mx-8 bg-modal px-2"
          >
            <Text className=" text-center text-2xl text-white font-exoBold mt-2">
              EVALUATION RESULT
            </Text>

            <View className="  rounded-3xl mb-5 mt-2 ">
              <Pressable
                onPress={() => (cssOpen.value = !cssOpen.value)}
                className="bg-accent px-6 py-2 rounded-lg"
              >
                <Text className="text-blue-400 font-exoBold text-lg">CSS</Text>

                <Animated.View style={cssStyle}>
                  <Text className="text-white font-exoRegular text-[10px] text-justify mt-1">
                    {evaluationRes?.cssFeedback ?? "No feedback yet."}
                  </Text>
                </Animated.View>
              </Pressable>
              <Pressable
                onPress={() => (jsOpen.value = !jsOpen.value)}
                className="bg-accent px-6 py-2 my-2 rounded-lg"
              >
                <Text className="text-yellow-400 font-exoBold text-lg ">
                  JavaScript
                </Text>

                <Animated.View style={jsStyle}>
                  <Text className="text-white font-exoRegular text-[10px] text-justify mt-1">
                    {evaluationRes?.jsFeedback ?? "No feedback yet."}
                  </Text>
                </Animated.View>
              </Pressable>
              <Pressable
                onPress={() => (htmlOpen.value = !htmlOpen.value)}
                className="bg-accent px-6 py-2 rounded-lg"
              >
                <Text className="text-orange-400 font-exoBold text-lg ">
                  HTML
                </Text>

                <Animated.View style={htmlStyle}>
                  <Text className="text-white font-exoRegular text-[10px] text-justify mt-1">
                    {evaluationRes?.htmlFeedback ?? "No feedback yet."}
                  </Text>
                </Animated.View>
              </Pressable>
            </View>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
