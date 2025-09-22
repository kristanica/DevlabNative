import useAddBlocks from "@/assets/Hooks/reducers/useAddBlocks";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import InputSelector from "./InputSelector";
import TestDropDownMenu from "./TestDropDownMenu";

const TestStageAdminModal = () => {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [counter, setCounter] = useState<number>(1);
  const { state, dispatch } = useAddBlocks();

  const addBlocks = () => {
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

  return (
    <Modal visible={true} animationType="none" transparent={true}>
      <Pressable
        className="flex-[1] justify-center items-center bg-black/30 "
        onPress={() => {}}
      >
        <Pressable
          className="w-[80%] h-[70%]"
          onPress={(e) => {
            e.stopPropagation();
          }}
        >
          <View className="  bg-accent  border-[2px] h-full border-[#ffffff43] rounded-xl px-5">
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
              {state.blocks.map((block) => (
                <InputSelector
                  dispatch={dispatch}
                  key={block.id}
                  block={block}
                  type={block.type}
                ></InputSelector>
              ))}
            </View>

            <Pressable
              onPress={() => {
                state.blocks.forEach((item) => {
                  console.log(item.value);
                });
              }}
            >
              <Text>Press this please</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default TestStageAdminModal;

const styles = StyleSheet.create({});
