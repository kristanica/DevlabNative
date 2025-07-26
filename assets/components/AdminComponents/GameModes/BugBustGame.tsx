import React from "react";
import { StyleSheet, View } from "react-native";
import InputContainer from "../InputContainer";
type BugBustProps = {
  data: any;
};
const BugBustGame = ({ data }: BugBustProps) => {
  return (
    <View>
      <InputContainer title="Gamemode title" placeholder={data?.title} />
      <InputContainer title="Instructions" placeholder={data?.instruction} />
      <InputContainer title="Topic" placeholder={data?.topic} />
      <InputContainer title="Coding interface" placeholder={data?.preCode} />
      <InputContainer title="Hint" placeholder={data?.hint} />
    </View>
  );
};

export default BugBustGame;

const styles = StyleSheet.create({});
