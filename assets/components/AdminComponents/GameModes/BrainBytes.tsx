import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import InputContainer from "../InputContainer";

type BrainBytesProps = {
  dispatch: any;
  state: any;
};
const BrainBytes = ({ dispatch, state }: BrainBytesProps) => {
  // const category = tracker((state) => state.levelPayload?.category);
  const handleChoiceChange = (field: string, value: string) => {
    dispatch({
      type: "UPDATE_FIELD_CHOICES",
      field,
      value,
    });
  };
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
        required={true}
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
        required={true}
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
        required={true}
      />
      <View className="bg-background border-[#90b6bb] border-[1px] p-3 rounded-2xl mt-3">
        <Text className="text-white my-2">
          Choices{" "}
          <Text className="text-red-300 text-xs font-exoBold">REQUIRED</Text>
        </Text>

        {[
          { label: "A", key: "a" },
          { label: "B", key: "b" },
          { label: "C", key: "c" },
          { label: "D", key: "d" },
        ].map(({ label, key }) => (
          <View
            key={key}
            className="flex-row items-center mb-3 bg-[#1c1f26] rounded-xl p-2"
            style={{ borderColor: "#a8b3b575", borderWidth: 1 }}
          >
            <Text className="text-white mr-2 font-medium">{label}.</Text>
            <TextInput
              multiline
              placeholder={`Enter choice ${label}`}
              placeholderTextColor="#8b8b8b"
              value={state.choices?.[key] || ""}
              onChangeText={(text) => handleChoiceChange(key, text)}
              className="flex-1 text-white"
            />
          </View>
        ))}

        <View
          className="flex-row items-center bg-[#1c1f26] rounded-xl p-2"
          style={{ borderColor: "#a8b3b575", borderWidth: 1 }}
        >
          <Text className="text-white mr-2 font-medium">Answer:</Text>
          <TextInput
            multiline
            placeholder="Enter correct answer (A, B, C, or D)"
            placeholderTextColor="#8b8b8b"
            value={state.choices?.correctAnswer || ""}
            onChangeText={(text) => handleChoiceChange("correctAnswer", text)}
            className="flex-1 text-white"
          />
        </View>
      </View>
    </>
  );
};

export default BrainBytes;

const styles = StyleSheet.create({});
