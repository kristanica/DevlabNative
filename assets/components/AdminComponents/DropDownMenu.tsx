import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

type DropDownMenuProps = {
  onSelect: (item: string) => void;
  placeHolder: string;
  value: string;
};

const DropDownMenu = ({ onSelect, placeHolder, value }: DropDownMenuProps) => {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const dropDown = [
    { id: "1", name: "Lesson" },
    { id: "2", name: "CodeCrafter" },
    { id: "3", name: "BrainBytes" },
    { id: "4", name: "CodeRush" },
    { id: "5", name: "BugBust" },
  ];

  return (
    <>
      <View className="bg-background border-[#56EBFF] border-[2px] p-3 rounded-2xl mt-3 ">
        <Text className="text-white font-exoRegular">Choose a gamemode</Text>
        <Pressable onPress={() => setOpenDropDown((prev: boolean) => !prev)}>
          <Text className="text-white border-[#a8b3b575] border-[2px] rounded-xl p-2 my-2">
            {value
              ? value
              : placeHolder
              ? placeHolder
              : "This is currently empty"}
          </Text>
        </Pressable>
        {openDropDown &&
          dropDown.map((item) => (
            <TouchableOpacity
              className=" rounded-2xl  "
              key={item.id}
              onPress={() => {
                onSelect(item.name);
                setOpenDropDown(false);
              }}
            >
              <Animated.View entering={FadeIn.duration(200)}>
                <Text className="text-white font-exoMedium bg-background py-3 mx-2 text-center ">
                  {item.name}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          ))}
      </View>
    </>
  );
};

export default DropDownMenu;

const styles = StyleSheet.create({});
