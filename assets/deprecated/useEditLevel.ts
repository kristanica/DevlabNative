import { useReducer } from "react";

type State = {
  coinsReward: number;
  desc: string;
  expReward: number;
  title: string;
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

const useEditLevel = () => {
  const [state, dispatch] = useReducer(reducer, {
    coinsReward: 0,
    desc: "",
    expReward: 0,
    title: "",
  });

  return { state, dispatch };
};
export default useEditLevel;
