import { useReducer } from "react";

type Block = {
  id: number;
  type: string;
  value: string;
};

type State = {
  blocks: Block[];
};

type Action =
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

const reducer = (state: State, action: Action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

const useAddBlocks = () => {
  const [state, dispatch] = useReducer(reducer, {
    blocks: [],
  });

  return { state, dispatch };
};
export default useAddBlocks;
