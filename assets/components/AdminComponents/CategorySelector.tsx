import React from "react";
import { Text } from "react-native";
import ButtonAnimated from "../ButtonComponent";

type categorySelectorProps = {
  setCategory: (category: string) => void;
};
const CategorySelector = ({ setCategory }: categorySelectorProps) => {
  return (
    <>
      <ButtonAnimated onPressAction={() => setCategory("Html")}>
        <Text className="text-white font-exoBold ">HTML</Text>
      </ButtonAnimated>
      <ButtonAnimated onPressAction={() => setCategory("Css")}>
        <Text className="text-white font-exoBold ">Css</Text>
      </ButtonAnimated>
      <ButtonAnimated onPressAction={() => setCategory("JavaScript")}>
        <Text className="text-white font-exoBold ">JavaScript</Text>
      </ButtonAnimated>
      <ButtonAnimated onPressAction={() => setCategory("Database")}>
        <Text className="text-white font-exoBold ">Database</Text>
      </ButtonAnimated>
    </>
  );
};

export default CategorySelector;
