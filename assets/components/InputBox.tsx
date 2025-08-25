import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

type InputBoxProps = {
  placeHolder: string;
  value: string;
  setValue: (value: string) => void;
  icon: keyof typeof Ionicons.glyphMap;

  isPassword?: boolean;
};

const InputBox = ({
  placeHolder,
  value,
  setValue,
  icon,
  isPassword,
}: InputBoxProps) => {
  const [isShown, setIsShown] = useState(false);
  const [password, setIsPassword] = useState(true);

  const setShownPassword = () => {
    setIsShown(!isShown);
    setIsPassword(!password);
  };
  return (
    <View className="flex-row items-center border-2 rounded-2xl w-[100%] my-2 ">
      <Ionicons
        name={icon}
        size={12}
        className="mx-3 border-r-2 pr-2 border-black"
        color={"#FFFFFE"}
      />
      <TextInput
        autoCapitalize="none"
        value={value}
        placeholder={placeHolder}
        className="text-offwhite py-2 flex-1 xs:text-xs sm:text-sm"
        secureTextEntry={isPassword ? password : false}
        onChangeText={setValue}
      />

      {icon === "lock-closed" && (
        <TouchableOpacity onPress={setShownPassword}>
          <Ionicons
            name={isShown ? "eye-off" : "eye"}
            size={12}
            className="mx-3"
            color={"#FFFFFE"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({});
