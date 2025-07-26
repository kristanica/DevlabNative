import React from "react";
import { StyleSheet, View } from "react-native";
import InputContainer from "../InputContainer";
type CodeCrafterProps = {
  data: any;
};
const CodeCrafter = ({ data }: CodeCrafterProps) => {
  return (
    <View>
      <InputContainer title="Gamemode Title" placeholder={data?.title} />
      <InputContainer title="Instruction" placeholder={data?.instruction} />
      <InputContainer title="Topic" placeholder={data?.topic} />
      <InputContainer title="Coding interface" placeholder={data?.preCode} />
      <InputContainer title="Hint" placeholder={data?.hint} />
      <InputContainer title="Replicate" placeholder="Replicate" />
    </View>
  );
};

export default CodeCrafter;

const styles = StyleSheet.create({});
