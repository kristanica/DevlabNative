import React from "react";
import { Text, TextInput, View } from "react-native";

const InputContainer = ({
  title,
  required,
  value,
  setValue,
  numeric,
}: InputContainerForAdminPayload) => {
  // const [localValue, setLocalValue] = useState<string | number>(value);

  // useEffect(() => {
  //   setLocalValue(value);
  // }, [value]);
  const handleChange = (text: string) => {
    if (numeric) {
      const cleanText = text.replace(/[^0-9]/g, "");
      setValue(cleanText);
    } else {
      setValue(text);
    }
  };
  return (
    <View className="bg-background border-[#90b6bb] border-[1px] p-3 rounded-2xl mt-3">
      <Text className="text-white my-2 font-exoBold">
        {title}{" "}
        {required ? (
          <Text className="text-red-300 text-xs">REQUIRED</Text>
        ) : (
          <Text className="text-blue-300 text-xs">NOT REQUIRED</Text>
        )}
      </Text>
      <TextInput
        multiline
        keyboardType={numeric ? "numeric" : "default"}
        value={String(value)}
        onChangeText={handleChange}
        className="rounded-xl p-2 text-white"
        style={{ borderColor: "#a8b3b575", borderWidth: 2 }} // FOR SOME FUCKING REASON, TAILWIND IS NOT WORKING ON BORDERS
      ></TextInput>
    </View>
  );
};

export default InputContainer;
