import React, { useReducer, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();

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
  const signup = async (username, email, password) => {
    try {
      await axios.post(`auth/register`, {
        username,
        email,
        password,
      });
      //   return await login(email, password);
    } catch (err) {
      throw new Error(err);
    }
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
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
