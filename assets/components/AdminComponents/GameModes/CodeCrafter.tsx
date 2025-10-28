import tracker from "@/assets/zustand/tracker";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CodingInterfaces from "../CodingInterfaces";
import InputContainer from "../InputContainer";

const CodeCrafter = ({
  dispatch,
  state,
  setReplicateFile,
}: CodeCrafterPayload) => {
  const pickReplicate = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "text/html",
    });

    if (result.canceled) return;

    const imageUri: string = result.assets[0].uri;
    console.log(imageUri);
    setReplicateFile(imageUri);
  };
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
        title={"Copy Code"}
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

      {/* Disable replication upload on Database Subject */}
      {category !== "Database" && (
        <View className="flex-row  justify-between bg-background border-[#56EBFF] border-[2px] p-3 rounded-2xl mt-3">
          <Text className="text-white mr-2">Upload a Replication file</Text>

          <TouchableOpacity onPress={pickReplicate}>
            {state.replicationFile ? (
              <Ionicons name="checkbox" size={20} color={"white"}></Ionicons>
            ) : null}
            <Ionicons
              name="cloud-upload-outline"
              size={20}
              color={"white"}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default CodeCrafter;

const styles = StyleSheet.create({});
