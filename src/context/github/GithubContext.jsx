import React from "react";
import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
    user: {},
    repos: [],
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);


  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });


  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
        setLoading
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
