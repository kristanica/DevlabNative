import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { JSX } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

type InputSelectorProps = {
  block: any;
  type: any;
  dispatch: any;
  index: any;
};

const selectImage = async (block: any, dispatch: any) => {
  const result: ImagePicker.ImagePickerResult =
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

  if (result.canceled) return;

  const imageUri: string = result.assets[0].uri;

  dispatch({
    type: "UPDATE_BLOCK",
    payload: {
      id: block.id,
      value: imageUri,
    },
  });
};

const InputSelector = ({
  block,
  type,
  dispatch,
  index,
}: InputSelectorProps) => {
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
            <Ionicons name={"trash-bin"} size={15} color={"red"}></Ionicons>
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
            <Ionicons name={"trash-bin"} size={15} color={"red"}></Ionicons>
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
        {index ? (
          <Ionicons
            name="checkbox"
            size={20}
            color={"green"}
            className="mr-5"
          ></Ionicons>
        ) : (
          <Ionicons
            name="warning"
            size={20}
            color={"red"}
            className="mr-5"
          ></Ionicons>
        )}
        <Pressable
          className="flex-row"
          onPress={() => selectImage(block, dispatch)}
        >
          <Text className="text-white my-2 mr-5">{block.type}</Text>
          <Ionicons name="cloud-upload" size={15} color={"white"}></Ionicons>
        </Pressable>

        <Pressable
          onPress={() => dispatch({ type: "REMOVE_BLOCK", id: block.id })}
        >
          <Ionicons name={"trash-bin"} size={15} color={"red"}></Ionicons>
        </Pressable>
      </View>
    ),
    Divider: (
      <View
        key={block.id}
        className=" justify-center items-center py-2 bg-background border-[#56EBFF] border-[2px] p-1 rounded-2xl mt-3 "
      >
        <Pressable
          onPress={() => dispatch({ type: "REMOVE_BLOCK", id: block.id })}
        >
          <Ionicons name={"trash-bin"} size={15} color={"red"}></Ionicons>
        </Pressable>
      </View>
    ),
  };

  return selectedInput[type] ?? null;
};

export default InputSelector;
