import React from "react";
import { StyleSheet } from "react-native";
import InputContainer from "../InputContainer";

type CodeRushProps = {
  stageData: any;
  dispatch: any;
  state: any;
};
const CodeRush = ({ stageData, dispatch, state }: CodeRushProps) => {
  return (
    <>
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
      <InputContainer
        title={"Timer"}
        placeholder={String(stageData?.timer)}
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
