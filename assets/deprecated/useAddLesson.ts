import { useReducer } from "react";

type BugBustOptions = {
  A: string;
  B: string;
  C: string;
  D: string;
  correctAnswer: string;
};

type State = {
  type: string;
  title: string;
  instruction: string;
  topic: string;
  preCode: string;
  hint?: string;
  timer?: string;
  options?: BugBustOptions;
};

type Action =
  | {
      type: "UPDATE_FIELD";
      field: keyof State;
      value: string;
    }
  | {
      type: "UPDATE_OPTION";
      field: keyof BugBustOptions;
      value: string;
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_FIELD": {
      return { ...state, [action.field]: action.value };
    }
    case "UPDATE_OPTION":
      return {
        ...state,
        options: {
          ...(state.options ?? {
            A: "",
            B: "",
            C: "",
            D: "",
            correctAnswer: "",
          }),
          [action.field]: action.value,
        },
      };

    default:
      return state;
  }
};

const useAddLesson = () => {
  const [state, dispatch] = useReducer(reducer, {
    type: "",
    title: "",
    instruction: "",
    topic: "",
    preCode: "",
  });

  return { state, dispatch };
};

export default useAddLesson;
