import React, { createContext, useContext, useReducer } from "react";

// Initialize the context with a default value (null)
export const StateContext = createContext(null);

// Wrap the app in the StateProvider to provide the global state
export const StateProvider = ({ reducer, initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to access the global state
export const useStateValue = () => {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error("useStateValue must be used within a StateProvider");
  }

  return context;
};
