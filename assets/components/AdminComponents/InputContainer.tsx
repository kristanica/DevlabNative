import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";

const InputContainer = ({
  title,

  value,
  setValue,
  numeric,
}: InputContainerForAdminPayload) => {
  const [localValue, setLocalValue] = useState<string | number>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <View className="bg-background border-[#56EBFF] border-[2px] p-3 rounded-2xl mt-3">
      <Text className="text-white my-2">{title}</Text>
      <TextInput
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
