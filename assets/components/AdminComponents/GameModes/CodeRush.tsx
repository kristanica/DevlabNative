import tracker from "@/assets/zustand/tracker";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import CodingInterfaces from "../CodingInterfaces";
import InputContainer from "../InputContainer";

const CodeRush = ({ dispatch, state }: StateDispatchPayload) => {
  const category = tracker((state) => state.levelPayload?.category);
  const totalSeconds = Number(state.timer) || 0;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const updateTimer = (m: number, s: number) => {
    const total = m * 60 + s;
    dispatch({
      type: "UPDATE_FIELD",
      field: "timer",
      value: total.toString(),
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

      {/* Renders input containers for coding interfaces */}
      <CodingInterfaces
        state={state}
        dispatch={dispatch}
        category={category!}
      ></CodingInterfaces>
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
      <View className="bg-background border-[#90b6bb] border-[1px] p-3 rounded-2xl mt-3">
        <Text className="text-white my-2 font-exoBold">Timer</Text>
        <View className="flex-row justify-between items-center">
          <View className="flex-1 mr-2">
            <Text className="text-white text-sm mb-1 font-exoLight opacity-50">
              Minutes
            </Text>
            <TextInput
              keyboardType="numeric"
              value={String(minutes)}
              onChangeText={(text: any) =>
                updateTimer(Number(text) || 0, seconds)
              }
              className="rounded-xl p-2 text-white text-center"
              style={{ borderColor: "#a8b3b575", borderWidth: 2 }}
            />
          </View>

          <View className="flex-1 ml-2">
            <Text className="text-white text-sm mb-1 font-exoLight opacity-50">
              Seconds
            </Text>
            <TextInput
              keyboardType="numeric"
              value={String(seconds)}
              onChangeText={(text: any) =>
                updateTimer(minutes, Number(text) || 0)
              }
              className="rounded-xl p-2 text-white text-center"
              style={{ borderColor: "#a8b3b575", borderWidth: 2 }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default CodeRush;

const styles = StyleSheet.create({});
