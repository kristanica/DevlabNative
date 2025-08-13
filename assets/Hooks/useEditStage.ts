import { useReducer } from "react";

type State = {
  //general
  title: string;
  description: string;
  isHidden: boolean;
  type: string;

  codingInterface: string;

  //Bug Bust
  instruction?: string;
  hint?: string;
  timer?: number;
};

type Action = {
  type: "UPDATE_FIELD";
  field: keyof State;
  value: string | boolean;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_FIELD": {
      return {
        ...state,
        [action.field]: action.value,
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
  });

  return { state, dispatch };
};
export default useEditStage;
