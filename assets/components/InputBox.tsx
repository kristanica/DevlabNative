import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

type InputBoxProps = {
  placeHolder: string;
  value: string;
  setValue: (value: string) => void;
  icon: keyof typeof Ionicons.glyphMap;
  //  optional variable to determine if the input is a password field
  //  if true, it will show the eye icon to toggle password visibility
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
  // Function to toggle password visibility
  // If isPassword is true, it will toggle the secureTextEntry property of the TextInput
  const setShownPassword = () => {
    setIsShown(!isShown);
    setIsPassword(!password);
  };
  return (
    <View className="flex-row  border-2 border-soli  p-2 rounded-3xl mt-2">
      <Ionicons
        name={icon}
        size={20}
        className="mx-3 border-r-2 pr-2 border-black"
        color={"#FFFFFE"}
      />
      <TextInput
        autoCapitalize="none"
        value={value}
        placeholder={placeHolder}
        className="text-offwhite"
        style={{
          // Set the width based on the icon type
          width: icon === "lock-closed" ? 200 : 240,
        }}
        // If isPassword is true, it will set the secureTextEntry property to true
        // If isShown is true, it will show the password
        secureTextEntry={isPassword ? password : false}
        onChangeText={setValue}
      />
      {/* Show the eye icon only if the input is a password field and toggle the visibility of the password
 If isShown is true, it will show the eye icon to toggle password visibility */}
      {icon === "lock-closed" && (
        <TouchableOpacity onPress={setShownPassword}>
          <Ionicons
            name={isShown ? "eye-off" : "eye"}
            size={20}
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
