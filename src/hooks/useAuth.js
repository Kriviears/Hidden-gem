import React, { useReducer, useEffect, useContext, createContext } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";

const initialState = {
  isAuthenticated: null,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const authContext = createContext();

export function ProvideAuth({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <authContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

export function useProvideAuth() {
  // let history = useNavigate();
  const { state, dispatch } = useAuth();
  //maybe router

  const login = async (email, password) => {
    try {
      const res = await axios.post(`auth/login`, {
        email,
        password,
      });
      localStorage.setItem("HiddenGemUser", JSON.stringify(res.data));
      dispatch({
        type: "LOGIN",
        payload: res.data,
      });
      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  const signup = async (username, password, email, city, state) => {
    try {
      await axios.post(`auth/register`, {
        username,
        password,
        email,
        city,
        state,
      });
      return await login(username, password);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    // history.pushState("/");
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("HiddenGemUser"));
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("HiddenGemUser"));
    if (savedUser) {
      dispatch({
        type: "LOGIN",
        payload: savedUser,
      });
    } else {
      dispatch({
        type: "LOGOUT",
      });
    }
  }, [dispatch]);

  return {
    state,
    getCurrentUser,
    login,
    signup,
    logout,
  };
}
