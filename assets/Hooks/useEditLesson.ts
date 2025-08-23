import { useReducer } from "react";

type State = {
  title: string;
  description: string;
  coinsReward: number;
  expReward: number;
};

type Action = {
  type: "UPDATE_LESSON_FIELD";
  field: keyof State;
  value: string;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_LESSON_FIELD": {
      return { ...state, [action.field]: action.value };
    }
    default: {
      return { ...state };
    }
  }
};

const useEditLesson = () => {
  const [state, dispatch] = useReducer(reducer, {
    title: "",
    description: "",
    coinsReward: 0,
    expReward: 0,
  });

  return { state, dispatch };
};
export default useEditLesson;
