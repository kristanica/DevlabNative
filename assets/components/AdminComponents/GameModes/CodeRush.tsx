import React from "react";
import { StyleSheet } from "react-native";
import InputContainer from "../InputContainer";

const CodeRush = ({ dispatch, state }: StateDispatchPayload) => {
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

      <InputContainer
        title={"Coding Interface"}
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
