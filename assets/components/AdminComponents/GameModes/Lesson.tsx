import tracker from "@/assets/zustand/tracker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Video as ExpoVideo, ResizeMode } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Video } from "react-native-compressor";
import FillScreenLoading from "../../global/FillScreenLoading";
import LoadingCompression from "../../LoadingCompression";
import CodingInterfaces from "../CodingInterfaces";
import InputContainer from "../InputContainer";
import InputSelector from "../InputSelector";
import TestDropDownMenu from "../TestDropDownMenu";
type lessonProps = {
  stageData?: any;
  dispatch: any;
  state: any;
  setVideoPresentation: any;
  videoPresentation: string | undefined;
};

const Lesson = ({
  stageData,
  dispatch,
  state,
  setVideoPresentation,
  videoPresentation,
}: lessonProps) => {
  const lastBlockId = stageData?.blocks?.length
    ? stageData.blocks[stageData.blocks.length - 1].id
    : 0;

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
  useEffect(() => {
    console.log(state);
  }, [state]);

  const category = tracker((state) => state.levelPayload?.category);

  useEffect(() => {
    if (!stageData) <FillScreenLoading></FillScreenLoading>;
  }, [stageData]);

  const isVideoAvailable = videoPresentation
    ? { uri: videoPresentation }
    : stageData?.videoPresentation
    ? { uri: stageData.videoPresentation }
    : undefined;

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
        required={true}
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
        required={true}
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
        required={true}
      />
      {isCompressing && (
        <LoadingCompression progress={progress}></LoadingCompression>
      )}

      <View className="bg-slate-700 px-1 my-3 py-3 rounded-xl">
        <Text className="text-white font-exoLight text-sm   text-center py-2">
          This is the content that will be shown to the users
        </Text>

        <View className="flex-col justify-between bg-background border-[#2a3141] border-[1px] p-3 rounded-2xl ">
          <Text className="text-red-300 font-exoBold text-xs mx-auto">
            REQUIRED
          </Text>
          <TestDropDownMenu
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          ></TestDropDownMenu>
        </View>
        <Pressable
          onPress={addBlocks}
          className="flex-row justify-between bg-background border-[#2a3141] border-[1px] p-3 rounded-2xl mt-3"
        >
          <Text className="text-white mx-auto font-exoBold text-lg ">
            ADD A BLOCK
          </Text>
        </Pressable>
        <View>
          {(state.blocks || []).map(
            (
              block: {
                id: number;
                type: string;
                value: string;
              },
              index: number
            ) => (
              <InputSelector
                index={state.blocks[index].value}
                dispatch={dispatch}
                key={block.id}
                block={block}
                blockType={block.type}
              ></InputSelector>
            )
          )}
        </View>
      </View>

      <View className="flex-col justify-between bg-background border-[#2a3141] border-[1px] p-3 rounded-2xl mt-3">
        <View className="flex-row ">
          <View className="flex-row">
            <Text className="text-white mr-2">Upload a video presentation</Text>
            {progress === 0.9984151721000671 && (
              <Ionicons
                name="checkbox-sharp"
                size={20}
                color={"green"}
              ></Ionicons>
            )}
          </View>

          <View className="flex-col w-full">
            <TouchableOpacity
              onPress={pickVideo}
              className="flex-row items-center mb-2"
            >
              {stageData?.videoPresentation || videoPresentation ? (
                <Ionicons
                  name="checkbox"
                  size={20}
                  color={"green"}
                  className="mr-2"
                />
              ) : (
                <Ionicons
                  name="warning"
                  size={20}
                  color={"red"}
                  className="mr-2"
                />
              )}
              <Ionicons name="cloud-upload-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        {isVideoAvailable && (
          <ExpoVideo
            source={isVideoAvailable}
            style={styles.video}
            useNativeControls
            isLooping
            resizeMode={ResizeMode.CONTAIN}
          />
        )}
      </View>
    </>
  );
};

export default Lesson;
const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: "100%",
    height: "50%", // optional if you want video to occupy half the screen
  },
  video: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 12,
  },
});
