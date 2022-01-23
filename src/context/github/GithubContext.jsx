import React from "react";
import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
    user: {},
    repos: [],
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //get initial users (testing purposes)
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const { items } = await res.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  const getUser = async (login) => {
    setLoading();
    const res = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    if (res.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await res.json();
      dispatch({ type: "SET_USER", payload: data });
    }
  };

  //get user repos
  const getUserRepos = async (user) => {
    setLoading();
    const res = await fetch(`${GITHUB_URL}/users/${user}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await res.json();
    dispatch({
      type: "GET_USER_REPOS",
      payload: data,
    });
  };

  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  const clearResults = () => {
    dispatch({
      type: "CLEAR_RESULTS",
    });
  };
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        searchUsers,
        clearResults,
        loading: state.loading,
        getUser,
        getUserRepos,
        user: state.user,
        repos: state.repos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
