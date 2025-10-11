import { useReducer } from "react";

type State = {
  title: string;
  description: string;
  coinsReward: number;
  expReward: number;
};
const initialState = {
  title: "",
  description: "",
  coinsReward: 0,
  expReward: 0,
};
type Action =
  | {
      type: "UPDATE_LESSON_FIELD";
      field: keyof State;
      value: string;
    }
  | { type: "UPDATE_ALL_FIELDS"; payload: any };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_LESSON_FIELD": {
      return { ...state, [action.field]: action.value };
    }
    case "UPDATE_ALL_FIELDS": {
      return {
        ...initialState,
        ...action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const useEditLesson = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};
export default useEditLesson;
