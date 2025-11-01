import LottieView from "lottie-react-native";
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
import Accordion from "../global/Accordion";
import SmallLoading from "../global/SmallLoading";
type levelFinishedModalPayload = ScaleModalPayload & {
  isRewardClaimed: boolean;
  evaluationData: any;
  feedbackArray: any;
};
const SubjectCompletedModal = ({
  visibility,
  scaleStyle,
  onConfirm,
  isRewardClaimed,
  evaluationData,
  feedbackArray,
}: levelFinishedModalPayload) => {
  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable className="flex-1 bg-black/50">
        <LottieView
          source={require("@/assets/Lottie/Confetti.json")}
          loop={false}
          autoPlay
          style={[StyleSheet.absoluteFillObject]}
        />
        <Animated.View
          style={[scaleStyle]}
          className={`  ${
            isRewardClaimed ? `h-[30%]` : `h-[80%]`
          } w-3/4 m-auto  rounded-[10px]`}
        >
          <View className=" flex-[1] bg-modal rounded-xl border-[#2a3141] border-[1px]">
            <Text className=" text-center text-[#f5ff42] font-exoExtraBold text-3xl mt-2">
              SUBJECT COMPLETED
            </Text>

            <View className="flex-[1]  mt-2 border-[#2a3141] border-0 border-t-[1px]">
              <Text className="text-white text-center font-exoBold xs:text-xl mt-2">
                PERFORMANCE SUMMARY
              </Text>
              <View className="mt-3">
                {isRewardClaimed ? (
                  <Text className="text-white text-center font-exoBold xs:text-xs">
                    You've already claimed the reward for this level!
                  </Text>
                ) : !evaluationData ? (
                  <SmallLoading text="getting your performance summary"></SmallLoading>
                ) : (
                  <View>
                    <View className="bg-[#080c15]  m-3 py-3 rounded-lg">
                      <Text className="text-white text-center font-exoBold xs:text-xs">
                        Lives Remaining:
                        <Text className="text-[#ad3532]"> </Text>
                      </Text>
                      <Text className="text-white text-center font-exoBold xs:text-xs">
                        DevCoins: +<Text className="text-[#e3be00]"></Text>
                      </Text>
                      <Text className="text-white text-center font-exoBold xs:text-xs">
                        Experience gained: +
                        <Text className="text-[#21b3cf]"></Text>
                      </Text>
                    </View>
                    <View className="bg-[#080c15]  mx-3 py-3 rounded-lg">
                      <Text className="text-white text-center font-exoBold xs:text-xs px-2">
                        {evaluationData.encouragement}
                      </Text>
                    </View>
                    {feedbackArray && (
                      <View className="bg-[#080c15]  mx-3 py-3 rounded-lg mt-2">
                        <Text className="text-white text-center font-exoBold xs:text-xs px-2">
                          {feedbackArray.feedback}
                        </Text>
                      </View>
                    )}
                    {Object.entries(evaluationData).map(
                      ([key, value]: [string, any]) => {
                        if (!value) return;
                        if (key === "encouragement") return null;
                        return (
                          <Accordion
                            header={key}
                            contents={value}
                            key={key}
                          ></Accordion>
                        );
                      }
                    )}
                  </View>
                )}
              </View>
            </View>

            <View
              className={`${
                isRewardClaimed ? `flex-[1]` : ``
              } items-center flex-row justify-evenly mb-11`}
            >
              <TouchableOpacity onPress={onConfirm}>
                <Text className="text-white py-2 px-7 font-exoBold self-start xs:text-[8px] bg-[#7F5AF0] rounded-2xl">
                  Back to Main
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default SubjectCompletedModal;

const styles = StyleSheet.create({});
