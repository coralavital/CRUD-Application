import React, { createContext, useEffect, useReducer, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import { reducer } from "./store/reducer/app-reducer";
import './custom.css';
import Constants from './utilities/Constants';

export const AuthContext = createContext();

const styles = {
  fontFamily: '"Segoe UI"',
  TextDecoder: 'none'
};

export default function App() {
  // Application state
  const [state, dispatch] = useReducer(reducer, {
    user: undefined,
  });
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const active_user_url = Constants.API_URL_GET_CURRENT_USER;

  const headers = {
    'Authorization': localStorage.getItem("Authorization"),
    'Content-Type': 'application/json'
  }

  useEffect(() => {
    // Send a GET request
    fetch(active_user_url, {
      method: 'GET',
      headers
    })
      .then(response => response.json())
      .then(response => {
        if (!response.user) {
          throw new Error(response.message);
        }
        dispatch({
          type: "GET_ACTIVE_USER",
          payload: { ...response }
        });
        setIsAuthenticating(false);
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("Authorization");
        setIsAuthenticating(false);
      })
  }, [])

  return (
    !isAuthenticating && (
      <div style={styles}>
        <AuthContext.Provider
          value={{
            state,
            dispatch
          }}
        >
          <Layout>
            <Routes>
              {AppRoutes.map((route, index) => {
                const { element, ...rest } = route;
                return <Route key={index} {...rest} element={element} />;
              })}
            </Routes>
          </Layout>
        </AuthContext.Provider>
      </div>

    )
  );
}