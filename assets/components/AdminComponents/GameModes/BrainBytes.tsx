import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import InputContainer from "../InputContainer";

type BrainBytesProps = {
  stageData: any;
  dispatch: any;
  state: any;
};
const BrainBytes = ({ stageData, dispatch, state }: BrainBytesProps) => {
  return (
    <View>
      <InputContainer
        title={"Title"}
        placeholder={stageData?.title}
        value={state.title}
        setValue={(text) => {
          dispatch({
            type: "UPDATE_FIELD",
            field: "title",
            value: text,
          });
        }}
        numeric={false}
      />

      <InputContainer
        title={"Description"}
        placeholder={stageData?.description}
        value={state.description}
        setValue={(text) => {
          dispatch({
            type: "UPDATE_FIELD",
            field: "description",
            value: text,
          });
        }}
        numeric={false}
      />

      <InputContainer
        title={"Coding Interface"}
        placeholder={stageData?.codingInterface}
        value={state.codingInterface}
        setValue={(text) => {
          dispatch({
            type: "UPDATE_FIELD",
            field: "codingInterface",
            value: text,
          });
        }}
        numeric={false}
      />
      <InputContainer
        title={"Instruction"}
        placeholder={stageData?.instruction}
        value={state.instruction}
        setValue={(text) => {
          dispatch({
            type: "UPDATE_FIELD",
            field: "instruction",
            value: text,
          });
        }}
        numeric={false}
      />
      <View className="bg-background border-[#56EBFF] border-[2px] p-3 rounded-2xl mt-3">
        <Text className="text-white my-2">Choices</Text>
        <TextInput
          placeholder={stageData?.choices?.a}
          multiline
          value={state.choices.a}
          onChangeText={(text) =>
            dispatch({ type: "UPDATE_FIELD_CHOICES", field: "a", value: text })
          }
          className="rounded-xl p-2 text-white"
          style={{ borderColor: "#a8b3b575", borderWidth: 2 }}
        ></TextInput>
        <TextInput
          placeholder={stageData?.choices?.b}
          multiline
          value={state.choices?.b}
          onChangeText={(text) =>
            dispatch({ type: "UPDATE_FIELD_CHOICES", field: "b", value: text })
          }
          className="rounded-xl p-2 text-white my-2"
          style={{ borderColor: "#a8b3b575", borderWidth: 2 }}
        ></TextInput>
        <TextInput
          placeholder={stageData?.choices?.c}
          multiline
          value={state.choices?.c}
          onChangeText={(text) =>
            dispatch({ type: "UPDATE_FIELD_CHOICES", field: "c", value: text })
          }
          className="rounded-xl p-2 text-white my-2"
          style={{ borderColor: "#a8b3b575", borderWidth: 2 }}
        ></TextInput>
        <TextInput
          placeholder={stageData?.choices?.d}
          multiline
          value={state.choices?.d}
          onChangeText={(text) =>
            dispatch({ type: "UPDATE_FIELD_CHOICES", field: "d", value: text })
          }
          className="rounded-xl p-2 text-white"
          style={{ borderColor: "#a8b3b575", borderWidth: 2 }}
        ></TextInput>

        <TextInput
          placeholder={stageData?.choices?.correctAnswer}
          multiline
          value={state.choices?.correctAnswer}
          onChangeText={(text) =>
            dispatch({
              type: "UPDATE_FIELD_CHOICES",
              field: "correctAnswer",
              value: text,
            })
          }
          className="rounded-xl p-2 text-white"
          style={{ borderColor: "#a8b3b575", borderWidth: 2 }}
        ></TextInput>
      </View>
    </View>
  );
};

export default BrainBytes;

const styles = StyleSheet.create({});
