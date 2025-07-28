import useAddLesson from "@/assets/Hooks/useAddLesson";
import useLessonMuation from "@/assets/Hooks/useLessonMutation";
import gameIdentifier from "@/assets/zustand/gameIdentifier";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import InputContainer from "../InputContainer";
type CodeRushProps = {
  data: any | "Fill the fields";
};
const CodeRush = ({ data }: CodeRushProps) => {
  const { state, dispatch } = useAddLesson();
  const gameIdenData = gameIdentifier((state) => state.data);
  const mutation = useLessonMuation();
  return (
    <View>
      <InputContainer
        title={"Gamemode Title"}
        value={state.title}
        placeholder={data?.title}
        setValue={(text) =>
          dispatch({
            type: "UPDATE_FIELD",
            field: "title",
            value: text,
          })
        }
      ></InputContainer>
      <InputContainer
        title={"Instruction"}
        placeholder={data?.instruction}
        value={state.instruction}
        setValue={(text) =>
          dispatch({ type: "UPDATE_FIELD", field: "instruction", value: text })
        }
      ></InputContainer>
      <InputContainer
        title={"Topic"}
        placeholder={data?.topic}
        value={state.topic}
        setValue={(text) =>
          dispatch({ type: "UPDATE_FIELD", field: "topic", value: text })
        }
      ></InputContainer>
      <InputContainer
        title={"Coding Interface"}
        placeholder={data?.preCode}
        value={state.preCode}
        setValue={(text) =>
          dispatch({ type: "UPDATE_FIELD", field: "preCode", value: text })
        }
      ></InputContainer>

      <InputContainer
        title="Hint"
        placeholder={data?.hint}
        value={state.hint || "unudentified"}
        setValue={(text) =>
          dispatch({ type: "UPDATE_FIELD", field: "hint", value: text })
        }
      />

      <View className="bg-background border-[#56EBFF] border-[2px] p-3 rounded-2xl mt-3">
        <Text className="text-white my-2">Timer</Text>
        <TextInput
          placeholder={data?.timer?.toString()}
          multiline
          keyboardType="numeric"
          value={state?.timer}
          onChangeText={(text) =>
            dispatch({ type: "UPDATE_FIELD", field: "timer", value: text })
          }
          className="rounded-xl p-2 text-white"
          style={{ borderColor: "#a8b3b575", borderWidth: 2 }}
        ></TextInput>
      </View>

      <View className="justify-evenly items-center flex-row my-7">
        <TouchableOpacity>
          <Text className="rounded-xl text-white font-exoBold py-2 px-7 bg-red-700 self-start">
            Delete
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            const type = gameIdenData?.gameCategory;
            dispatch({
              type: "UPDATE_FIELD",
              field: "type",
              value: type as string,
            });

            mutation.mutate({ state: { ...state, type }, type });
          }}
        >
          <Text className="rounded-xl text-white font-exoBold py-2 px-7 bg-green-700 self-start">
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CodeRush;

const styles = StyleSheet.create({});
