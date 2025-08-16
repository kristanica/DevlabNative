import React from "react";
import { StyleSheet, View } from "react-native";
import InputContainer from "../InputContainer";

type CodeCrafterProps = {
  stageData: any;
  dispatch: any;
  state: any;
};
const CodeCrafter = ({ stageData, dispatch, state }: CodeCrafterProps) => {
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

      <InputContainer
        title={"Copy Code"}
        placeholder={stageData.copyCode}
        value={state.copyCode}
        setValue={(text) => {
          dispatch({
            type: "UPDATE_FIELD",
            field: "copyCode",
            value: text,
          });
        }}
        numeric={false}
      />
    </View>
  );
};

export default CodeCrafter;

const styles = StyleSheet.create({});
