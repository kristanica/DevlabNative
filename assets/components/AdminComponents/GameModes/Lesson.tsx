import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { Video } from "react-native-compressor";

import LoadingCompression from "../../LoadingCompression";
import InputContainer from "../InputContainer";
import InputSelector from "../InputSelector";
import TestDropDownMenu from "../TestDropDownMenu";
type lessonProps = {
  stageData: any;
  dispatch: any;
  state: any;
  setVideoPresentation: any;
};

const Lesson = ({
  stageData,
  dispatch,
  state,
  setVideoPresentation,
}: lessonProps) => {
  const lastBlockId = stageData?.blocks?.length
    ? stageData.blocks[stageData.blocks.length - 1].id
    : 0;

  console.log(lastBlockId);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const [counter, setCounter] = useState<number>(lastBlockId + 1);
  const addBlocks = () => {
    if (selectedItem === "") {
      console.log("empty");
      return;
    }
    dispatch({
      type: "ADD_BLOCK",
      payload: {
        id: counter,
        type: selectedItem,
        value: "",
      },
    });

    setCounter((prev) => prev + 1);
    setSelectedItem("");
  };
  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "video/*",
        copyToCacheDirectory: true,
      });
      if (!result.canceled) {
        setIsCompressing(true);

        const compreesedUri = await Video.compress(
          result.assets[0].uri,
          {
            compressionMethod: "auto",
          },
          (progress) => {
            console.log("Compression Progress: ", progress);
            setProgress(progress);
          }
        );

        setVideoPresentation(compreesedUri);
        setIsCompressing(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
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
      {isCompressing && (
        <LoadingCompression progress={progress}></LoadingCompression>
      )}

      <View className="flex-row justify-between bg-background border-[#56EBFF] border-[2px] p-3 rounded-2xl mt-3">
        <TestDropDownMenu
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        ></TestDropDownMenu>
        <Pressable onPress={addBlocks} className="absolute top-6 right-8">
          <Text className="text-green-400 text-2xl ">+</Text>
        </Pressable>
      </View>
      <View>
        {state.blocks.map((block: any) => (
          <InputSelector
            dispatch={dispatch}
            key={block.id}
            block={block}
            type={block.type}
          ></InputSelector>
        ))}
      </View>

      <View className="flex-row  justify-between bg-background border-[#56EBFF] border-[2px] p-3 rounded-2xl mt-3">
        <View className="flex-row">
          <Text className="text-white mr-2">Upload a presentation</Text>
          {progress === 0.9984151721000671 && (
            <Ionicons
              name="checkbox-sharp"
              size={20}
              color={"green"}
            ></Ionicons>
          )}
        </View>

        <TouchableOpacity onPress={pickVideo}>
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

export default Lesson;
