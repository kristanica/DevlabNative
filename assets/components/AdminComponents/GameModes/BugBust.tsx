import React from "react";
import { StyleSheet } from "react-native";
import InputContainer from "../InputContainer";

type BugBustProps = {
  stageData: any;
  dispatch: any;
  state: any;
};
const BugBust = ({ stageData, dispatch, state }: BugBustProps) => {
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
        title={"Hint"}
        placeholder={stageData?.hint}
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
