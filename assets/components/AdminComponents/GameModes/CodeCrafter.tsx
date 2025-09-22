import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InputContainer from "../InputContainer";
type CodeCrafterProps = {
  stageData: any;
  dispatch: any;
  state: any;
  setReplicateFile: any;
};
const CodeCrafter = ({
  stageData,
  dispatch,
  state,
  setReplicateFile,
}: CodeCrafterProps) => {
  const pickReplicate = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "text/html",
    });

    if (result.canceled) return;

    const imageUri: string = result.assets[0].uri;
    console.log(imageUri);
    setReplicateFile(imageUri);
  };

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
      <View className="flex-row  justify-between bg-background border-[#56EBFF] border-[2px] p-3 rounded-2xl mt-3">
        <Text className="text-white mr-2">Upload a presentation</Text>

        <TouchableOpacity onPress={pickReplicate}>
          <Ionicons
            name="cloud-upload-outline"
            size={20}
            color={"white"}
          ></Ionicons>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CodeCrafter;

const styles = StyleSheet.create({});
