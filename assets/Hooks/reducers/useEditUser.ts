import { useReducer } from "react";

type State = {
  username: string;
  bio: string;
  userLevel: number;
  email: string;
  coins: number; //Will change to number when updating
  exp: number; //Will change to number when updating
  // inventory: Record<
  //   string,
  //   {
  //     quantity: number;
  //     title: string;
  //   }
  // >;
};

type Action =
  | {
      type: "UPDATE_FIELD";
      field: keyof State;
      value: State[keyof State];
    }
  | {
      type: "UPDATE_INVENTORY_FIELD";
      key: string; // item1, item2, etc.
      field: "quantity" | "title";
      value: string | number;
    }
  | { type: "UPDATE_ALL_FIELDS"; payload: any };

const initialState: State = {
  username: "",
  bio: "",
  userLevel: 0,
  email: "",
  coins: 0, //Will change to number when updating
  exp: 0, //Will change to number when updating
  // inventory: {},
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_FIELD": {
      return { ...state, [action.field]: action.value };
    }
    case "UPDATE_ALL_FIELDS": {
      return { ...initialState, ...action.payload };
    }
    // case "UPDATE_INVENTORY_FIELD": {
    //   return {
    //     ...state,
    //     inventory: {
    //       ...state.inventory,
    //       [action.key]: {
    //         ...state.inventory[action.key],
    //         [action.field]: action.value,
    //       },
    //     },
    //   };
    // }
    default: {
      return state;
    }
  }
};

export const useEditUser = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};
