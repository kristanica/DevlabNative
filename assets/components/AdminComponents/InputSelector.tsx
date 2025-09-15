import Ionicons from "@expo/vector-icons/Ionicons";
import { JSX } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
type InputSelectorProps = {
  block: any;
  type: any;
  dispatch: any;
};

const InputSelector = ({ block, type, dispatch }: InputSelectorProps) => {
  const selectedInput: Record<string, JSX.Element> = {
    Paragraph: (
      <View
        key={block.id}
        className="bg-background border-[#56EBFF] border-[2px] p-3 rounded-2xl mt-3"
      >
        <View className="flex-row justify-between">
          <Text className="text-white my-2">{block.type}</Text>
          <Pressable
            onPress={() => dispatch({ type: "REMOVE_BLOCK", id: block.id })}
          >
            <Ionicons name={"trash-bin"} size={30} color={"red"}></Ionicons>
          </Pressable>
        </View>

        <TextInput
          multiline
          value={block.value}
          onChangeText={(text) =>
            dispatch({
              type: "UPDATE_BLOCK",
              payload: {
                id: block.id,
                value: text,
              },
            })
          }
          className="rounded-xl p-2 text-white"
          style={{ borderColor: "#a8b3b575", borderWidth: 2 }} // FOR SOME FUCKING REASON, TAILWIND IS NOT WORKING ON BORDERS
        ></TextInput>
      </View>
    ),
    Header: (
      <View
        key={block.id}
        className="bg-background border-[#56EBFF] border-[2px] p-3 rounded-2xl mt-3"
      >
        <View className="flex-row justify-between">
          <Text className="text-white my-2">{block.type}</Text>
          <Pressable
            onPress={() => dispatch({ type: "REMOVE_BLOCK", id: block.id })}
          >
            <Ionicons name={"trash-bin"} size={30} color={"red"}></Ionicons>
          </Pressable>
        </View>
        <TextInput
          multiline
          value={block.value}
          onChangeText={(text) =>
            dispatch({
              type: "UPDATE_BLOCK",
              payload: {
                id: block.id,
                value: text,
              },
            })
          }
          className="rounded-xl p-2 text-white"
          style={{ borderColor: "#a8b3b575", borderWidth: 2 }} // FOR SOME FUCKING REASON, TAILWIND IS NOT WORKING ON BORDERS
        ></TextInput>
      </View>
    ),
    Image: (
      <View
        key={block.id}
        className=" flex-row justify-between bg-background border-[#56EBFF] border-[2px] p-3 rounded-2xl mt-3"
      >
        <Pressable className="flex-row">
          <Text className="text-white my-2 mr-5">{block.type}</Text>
          <Ionicons name="cloud-upload" size={30} color={"white"}></Ionicons>
        </Pressable>

        <Pressable
          onPress={() => dispatch({ type: "REMOVE_BLOCK", id: block.id })}
        >
          <Ionicons name={"trash-bin"} size={30} color={"red"}></Ionicons>
        </Pressable>
      </View>
    ),
  };

  return selectedInput[type] ?? null;
};

export default InputSelector;
