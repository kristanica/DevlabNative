import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

type Props = {
  selectedItem: any;
  setSelectedItem: any;
};

const TestDropDownMenu = (props: Props) => {
  const [isDropDownOpen, setDropDown] = useState<boolean>(false);
  const dropDownItem = [
    {
      id: "1",
      name: "Header",
    },
    { id: "2", name: "Paragraph" },
    {
      id: "3",
      name: "Image",
    },
  ];
  return (
    <View className="w-full">
      <Pressable onPress={() => setDropDown((prev) => !prev)}>
        <Text className="text-white border-[#a8b3b575] border-[2px] rounded-xl p-2 my-2">
          {props.selectedItem.length > 0
            ? props.selectedItem
            : "Select an option"}
        </Text>
      </Pressable>
      {isDropDownOpen &&
        dropDownItem.map((item, index) => (
          <Pressable
            onPress={() => {
              props.setSelectedItem(item.name);
              console.log("Selected:", item.name);
              setDropDown(false);
            }}
            key={index}
          >
            <Animated.View entering={FadeIn.duration(200)}>
              <Text className="text-white font-exoMedium bg-background py-3 mx-2 text-center ">
                {item.name}
              </Text>
            </Animated.View>
          </Pressable>
        ))}
    </View>
  );
};

export default TestDropDownMenu;
