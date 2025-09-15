import { useReducer } from "react";

type BrainBytesChoices = {
  a: string;
  b: string;
  c: string;
  d: string;
  correctAnswer: string;
};
type Block = {
  id: number;
  type: string;
  value: string;
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
  blocks: Block[];
  //CodeCrafter
  //This is a picture
  copyCode: string;
};
const initialState = {
  //general
  title: "",
  description: "",
  isHidden: false,
  type: "",
  instruction: "",
  codingInterface: "",

  //Bug Bust
  hint: "",

  //Code Rush
  timer: undefined,

  //BrainBytes
  choices: {
    a: "",
    b: "",
    c: "",
    d: "",
    correctAnswer: "",
  },

  //CodeCrafter
  //This is a picture
  copyCode: "",
  blocks: [],
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
    }
  | {
      type: "RESET_ALL_FIELD";
    }
  | {
      type: "ADD_BLOCK";
      payload: Block;
    }
  | {
      type: "UPDATE_BLOCK";
      payload: Partial<Block>;
    }
  | {
      type: "REMOVE_BLOCK";
      id: number;
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
    case "ADD_BLOCK": {
      return {
        ...state,
        blocks: [
          ...state.blocks,
          {
            id: action.payload.id,
            value: action.payload.value,
            type: action.payload.type,
          },
        ],
      };
    }

    case "UPDATE_BLOCK": {
      return {
        ...state,
        blocks: state.blocks.map((block) =>
          block.id === action.payload.id
            ? {
                ...block,
                value: action.payload.value!,
              }
            : block
        ),
      };
    }
    case "REMOVE_BLOCK": {
      return {
        ...state,
        blocks: state.blocks.filter((block) => block.id !== action.id),
      };
    }
    case "RESET_ALL_FIELD": {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
};

const useEditStage = (blocks: any) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    blocks: blocks || [],
  });

  return { state, dispatch };
};
export default useEditStage;
