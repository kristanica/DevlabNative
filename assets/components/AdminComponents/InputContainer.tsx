import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type InputContainerProps = {
  title: string;
  placeholder: string;
  value: string;
  setValue: (val: string) => void;
};
const InputContainer = ({
  title,
  placeholder,
  value,
  setValue,
}: InputContainerProps) => {
  return (
    <View className="bg-background border-[#56EBFF] border-[2px] p-3 rounded-2xl mt-3">
      <Text className="text-white my-2">{title}</Text>
      <TextInput
        placeholder={placeholder}
        multiline
        value={value}
        onChangeText={setValue}
        className="rounded-xl p-2 text-white"
        style={{ borderColor: "#a8b3b575", borderWidth: 2 }} // FOR SOME FUCKING REASON, TAILWIND IS NOT WORKING ON BORDERS
      ></TextInput>
    </View>
  );
};

export default InputContainer;

const styles = StyleSheet.create({});
