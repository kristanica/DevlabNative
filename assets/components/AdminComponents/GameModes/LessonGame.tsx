import React from "react";
import { StyleSheet, View } from "react-native";
import InputContainer from "../InputContainer";

type lessonProps = {
  data: any;
};
const LessonGame = ({ data }: lessonProps) => {
  return (
    <View>
      <InputContainer
        title={"Gamemode Title"}
        placeholder={data?.title}
      ></InputContainer>
      <InputContainer
        title={"Instruction"}
        placeholder={data?.instruction}
      ></InputContainer>
      <InputContainer
        title={"Topic"}
        placeholder={data?.topic}
      ></InputContainer>
      <InputContainer
        title={"Coding Interface"}
        placeholder={data?.preCode}
      ></InputContainer>
    </View>
  );
};

export default LessonGame;

const styles = StyleSheet.create({});
