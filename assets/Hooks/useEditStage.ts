import { useReducer } from "react";

type BrainBytesChoices = {
  a: string;
  b: string;
  c: string;
  d: string;
  correctAnswer: string;
};

type State = {
  //general
  title: string;
  description: string;
  isHidden: boolean;
  type: string;
  instruction: string;
  codingInterface?: string;

  //Bug Bust
  hint?: string;

  //Code Rush
  timer?: number;

  //BrainBytes
  choices: BrainBytesChoices;

  //CodeCrafter
  //This is a picture
  copyCode: string;
};

type Action =
  | {
      type: "UPDATE_FIELD";
      field: keyof State;
      value: string | boolean;
    }
  | {
      type: "UPDATE_FIELD_CHOICES";
      field: keyof BrainBytesChoices;
      value: string;
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_FIELD": {
      return {
        ...state,
        [action.field]: action.value,
      };
    }
    case "UPDATE_FIELD_CHOICES": {
      return {
        ...state,
        choices: {
          ...state.choices,
          [action.field]: action.value,
        },
      };
    }
    default: {
      return state;
    }
  }
};

const useEditStage = () => {
  const [state, dispatch] = useReducer(reducer, {
    title: "",
    description: "",
    isHidden: false,
    type: "",

    codingInterface: "",
    instruction: "",
    hint: "",
    timer: 0,
    choices: {
      a: "",
      b: "",
      c: "",
      d: "",
      correctAnswer: "",
    },
    copyCode: "",
  });

  return { state, dispatch };
};
export default useEditStage;
