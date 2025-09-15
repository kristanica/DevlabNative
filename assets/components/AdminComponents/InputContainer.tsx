import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";

type InputContainerProps = {
  title: string;
  placeholder?: string;
  value: string | number;
  setValue: (val: string) => void;
  numeric: boolean;
};
const InputContainer = ({
  title,
  placeholder,
  value,
  setValue,
  numeric,
}: InputContainerProps) => {
  const [localValue, setLocalValue] = useState<string | number>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <View className="bg-background border-[#56EBFF] border-[2px] p-3 rounded-2xl mt-3">
      <Text className="text-white my-2">{title}</Text>
      <TextInput
        placeholder={placeholder}
        multiline
        keyboardType={numeric ? "numeric" : "default"}
        value={String(localValue)}
        onChangeText={setValue}
        className="rounded-xl p-2 text-white"
        style={{ borderColor: "#a8b3b575", borderWidth: 2 }} // FOR SOME FUCKING REASON, TAILWIND IS NOT WORKING ON BORDERS
      ></TextInput>
    </View>
  );
};

export default InputContainer;
