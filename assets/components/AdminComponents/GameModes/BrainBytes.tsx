import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import InputContainer from "../InputContainer";

type BrainBytesProps = {
  dispatch: any;
  state: any;
};
const BrainBytes = ({ dispatch, state }: BrainBytesProps) => {
  // const category = tracker((state) => state.levelPayload?.category);

  return (
    <>
      <InputContainer
        title={"Title"}
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
      {/* <CodingInterfaces
        state={state}
        dispatch={dispatch}
        category={category!}
      ></CodingInterfaces> */}
      <InputContainer
        title={"Instruction"}
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
        <View className="flex flex-row justify-center items-center">
          <Text className="text-white">A. </Text>

          <TextInput
            multiline
            value={state.choices.a}
            onChangeText={(text) =>
              dispatch({
                type: "UPDATE_FIELD_CHOICES",
                field: "a",
                value: text,
              })
            }
            className="rounded-xl p-2 text-white"
            style={{ borderColor: "#a8b3b575", borderWidth: 2 }}
          ></TextInput>
        </View>
        <View className="flex flex-row justify-center items-center">
          <Text className="text-white">C. </Text>
          <TextInput
            multiline
            value={state.choices?.b}
            onChangeText={(text) =>
              dispatch({
                type: "UPDATE_FIELD_CHOICES",
                field: "b",
                value: text,
              })
            }
            className="rounded-xl p-2 text-white my-2"
            style={{ borderColor: "#a8b3b575", borderWidth: 2 }}
          ></TextInput>
        </View>
        <View className="flex flex-row justify-center items-center">
          <Text className="text-white">B. </Text>
          <TextInput
            multiline
            value={state.choices?.c}
            onChangeText={(text) =>
              dispatch({
                type: "UPDATE_FIELD_CHOICES",
                field: "c",
                value: text,
              })
            }
            className="rounded-xl p-2 text-white my-2"
            style={{ borderColor: "#a8b3b575", borderWidth: 2 }}
          ></TextInput>
        </View>
        <View className="flex flex-row justify-center items-center">
          <Text className="text-white">D. </Text>
          <TextInput
            multiline
            value={state.choices?.d}
            onChangeText={(text) =>
              dispatch({
                type: "UPDATE_FIELD_CHOICES",
                field: "d",
                value: text,
              })
            }
            className="rounded-xl p-2 text-white"
            style={{ borderColor: "#a8b3b575", borderWidth: 2 }}
          ></TextInput>
        </View>
        <View className="flex flex-row justify-center items-center">
          <Text className="text-white">Answer </Text>
          <TextInput
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
    </>
  );
};

export default BrainBytes;

const styles = StyleSheet.create({});
