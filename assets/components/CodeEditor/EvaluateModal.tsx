import { Modal, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { Accordion } from "../global/Accordion";
type EvaluateMoalProps = ScaleModalPayload & {
  gptResponse: any;
};

const EvaluateModal = (props: EvaluateMoalProps) => {
  return (
    <Modal visible={props.visibility} animationType="none" transparent={true}>
      <Pressable onPress={props.closeModal} className="flex-1 mx-5 bg-black/50">
        <Pressable onPress={(e) => e.stopPropagation()} className="my-auto">
          <Animated.View
            style={[props.scaleStyle]}
            className="w-fit  rounded-[10px] mx-2 bg-modal"
          >
            <Accordion
              header={"Feedback"}
              contents={props.gptResponse.feedback}
            ></Accordion>

            <Accordion
              header={"Suggestion"}
              contents={props.gptResponse.suggestion}
            ></Accordion>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EvaluateModal;
