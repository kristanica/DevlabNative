import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import InputContainer from "../InputContainer";
type BrainBytesProps = {
  data: any;
};
const BrainBytes = ({ data }: BrainBytesProps) => {
  return (
    <View>
      <InputContainer title="Gamemode Title" placeholder={data?.title} />
      <InputContainer title="Instruction" placeholder={data?.instruction} />
      <InputContainer title="Topic" placeholder={data?.topic} />
      <View className="bg-background border-[#56EBFF] border-[2px] p-3 rounded-2xl mt-3">
        <Text className="text-white my-2">Choices</Text>
        <TextInput
          placeholder={data?.options?.A}
          multiline
          className="rounded-xl p-2 text-white"
          style={{ borderColor: "#a8b3b575", borderWidth: 2 }}
        ></TextInput>
        <TextInput
          placeholder={data?.options?.B}
          multiline
          className="rounded-xl p-2 text-white"
          style={{ borderColor: "#a8b3b575", borderWidth: 2 }}
        ></TextInput>
        <TextInput
          placeholder={data?.options?.C}
          multiline
          className="rounded-xl p-2 text-white"
          style={{ borderColor: "#a8b3b575", borderWidth: 2 }}
        ></TextInput>
        <TextInput
          placeholder={data?.options?.D}
          multiline
          className="rounded-xl p-2 text-white"
          style={{ borderColor: "#a8b3b575", borderWidth: 2 }}
        ></TextInput>
      </View>
    </View>
  );
};

export default BrainBytes;

const styles = StyleSheet.create({});
