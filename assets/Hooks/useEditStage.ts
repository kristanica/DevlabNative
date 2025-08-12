import { useReducer } from "react";

type State = {
  title: string;
  description: string;
  isHidden: boolean;
  type: string;
  coinsReward: number;
  expReward: number;
};

type Action = {
  type: "UPDATE_FIELD";
  field: keyof State;
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
    coinsReward: 0,
    expReward: 0,
  });

  return { state, dispatch };
};
export default useEditStage;
