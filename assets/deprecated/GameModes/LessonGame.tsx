import useAddLesson from "@/assets/deprecated/useAddLesson";
import useLessonMuation from "@/assets/Hooks/useLessonMutation";
import gameIdentifier from "@/assets/zustand/gameIdentifier";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import InputContainer from "../../components/AdminComponents/InputContainer";

type lessonProps = {
  data: any;
};

const LessonGame = ({ data }: lessonProps) => {
  const { state, dispatch } = useAddLesson();
  const gameIdenData = gameIdentifier((state) => state.data);
  const mutation = useLessonMuation();

  return (
    <View>
      <InputContainer
        title={"Gamemode Title"}
        value={state.title}
        placeholder={data?.title}
        setValue={(text) =>
          dispatch({
            type: "UPDATE_FIELD",
            field: "title",
            value: text,
          })
        }
      ></InputContainer>
      <InputContainer
        title={"Instruction"}
        placeholder={data?.instruction}
        value={state.instruction}
        setValue={(text) =>
          dispatch({ type: "UPDATE_FIELD", field: "instruction", value: text })
        }
      ></InputContainer>
      <InputContainer
        title={"Topic"}
        placeholder={data?.topic}
        value={state.topic}
        setValue={(text) =>
          dispatch({ type: "UPDATE_FIELD", field: "topic", value: text })
        }
      ></InputContainer>
      <InputContainer
        title={"Coding Interface"}
        placeholder={data?.preCode}
        value={state.preCode}
        setValue={(text) =>
          dispatch({ type: "UPDATE_FIELD", field: "preCode", value: text })
        }
      ></InputContainer>

      <View className="justify-evenly items-center flex-row my-7">
        <TouchableOpacity>
          <Text className="rounded-xl text-white font-exoBold py-2 px-7 bg-red-700 self-start">
            Delete
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            const type = gameIdenData?.gameCategory;
            dispatch({
              type: "UPDATE_FIELD",
              field: "type",
              value: type as string,
            });

            mutation.mutate({ state: { ...state, type }, type });
          }}
        >
          <Text className="rounded-xl text-white font-exoBold py-2 px-7 bg-green-700 self-start">
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LessonGame;
