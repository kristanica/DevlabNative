import React from "react";
import { StyleSheet } from "react-native";
import InputContainer from "../InputContainer";

const BugBust = ({ dispatch, state }: StateDispatchPayload) => {
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
        title={"Coding Interface CSS"}
        value={state.codingInterface.css}
        setValue={(text) => {
          dispatch({
            type: "UPDATE_CODING_INTERFACE",
            field: "css",
            value: text,
          });
        }}
        numeric={false}
      />
      <InputContainer
        title={"Coding Interface JS"}
        value={state.codingInterface.js}
        setValue={(text) => {
          dispatch({
            type: "UPDATE_CODING_INTERFACE",
            field: "js",
            value: text,
          });
        }}
        numeric={false}
      />
      <InputContainer
        title={"Coding Interface HTML"}
        value={state.codingInterface.html}
        setValue={(text) => {
          dispatch({
            type: "UPDATE_CODING_INTERFACE",
            field: "html",
            value: text,
          });
        }}
        numeric={false}
      />
      <InputContainer
        title={"Coding Interface QUEREYING"}
        value={state.codingInterface.database}
        setValue={(text) => {
          dispatch({
            type: "UPDATE_CODING_INTERFACE",
            field: "database",
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
        title={"Hint"}
        value={state.hint}
        setValue={(text) => {
          dispatch({
            type: "UPDATE_FIELD",
            field: "hint",
            value: text,
          });
        }}
        numeric={false}
      />
    </>
  );
};

export default BugBust;

const styles = StyleSheet.create({});
