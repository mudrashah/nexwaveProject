import React, { createContext, useReducer, ReactNode } from "react";

// Define action types
type Action =
  | { type: "SET_LIST_DATA"; payload: any[] }
  | { type: "SET_SAMPLE_LIST_DATA"; payload: any[] };

// Define state structure
interface ListState {
  listData: any[];
  sampleListData: any[];
}

// Initial state
const initialState: ListState = {
  listData: [],
  sampleListData: [],
};

// Reducer function
const listReducer = (state: ListState, action: Action): ListState => {
  switch (action.type) {
    case "SET_LIST_DATA":
      return { ...state, listData: action.payload };
    case "SET_SAMPLE_LIST_DATA":
      return { ...state, sampleListData: action.payload };
    default:
      return state;
  }
};

// Create context
interface ListContextProps extends ListState {
  setListData: (data: any[]) => void;
  setSampleListData: (data: any[]) => void;
}

export const ListContext = createContext<ListContextProps | undefined>(
  undefined
);

// Provider component
export const ListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(listReducer, initialState);

  // Action dispatchers
  const setListData = (data: any[]) => {
    dispatch({ type: "SET_LIST_DATA", payload: data });
  };

  const setSampleListData = (data: any[]) => {
    dispatch({ type: "SET_SAMPLE_LIST_DATA", payload: data });
  };

  return (
    <ListContext.Provider value={{ ...state, setListData, setSampleListData }}>
      {children}
    </ListContext.Provider>
  );
};
