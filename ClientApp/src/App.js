import React, { Component, createContext, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import { reducer } from "./store/reducer/app-reducer";
import './custom.css'


export const AuthContext = createContext();

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    user: undefined,
  });
  // static displayName = App.name;
  return (
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
  );
}
