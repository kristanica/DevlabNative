import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import InputContainer from "../InputContainer";
type CodeRushProps = {
  data: any | "Fill the fields";
};
const CodeRush = ({ data }: CodeRushProps) => {
  return (
    <View>
      <InputContainer title="Gamemode Title" placeholder={data?.title} />
      <InputContainer title="Instruction" placeholder={data?.instruction} />
      <InputContainer title="Topic" placeholder={data?.topic} />
      <InputContainer title="Coding Interface" placeholder={data?.preCode} />
      <InputContainer title="Hint" placeholder={data?.hint} />
      <View className="bg-background border-[#56EBFF] border-[2px] p-3 rounded-2xl mt-3">
        <Text className="text-white my-2">Timer</Text>
        <TextInput
          placeholder={data?.timer?.toString()}
          multiline
          keyboardType="numeric"
          className="rounded-xl p-2 text-white"
          style={{ borderColor: "#a8b3b575", borderWidth: 2 }}
        ></TextInput>
      </View>
    </View>
  );
};

export default CodeRush;

const styles = StyleSheet.create({});
