import tracker from "@/assets/zustand/tracker";
import React from "react";
import { StyleSheet } from "react-native";
import CodingInterfaces from "../CodingInterfaces";
import InputContainer from "../InputContainer";

const CodeRush = ({ dispatch, state }: StateDispatchPayload) => {
  const category = tracker((state) => state.levelPayload?.category);
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
      <InputContainer
        title={"Timer"}
        value={String(state.timer)}
        setValue={(text) => {
          dispatch({
            type: "UPDATE_FIELD",
            field: "timer",
            value: text,
          });
        }}
        numeric={true}
      ></InputContainer>
    </>
  );
};

export default CodeRush;

const styles = StyleSheet.create({});
