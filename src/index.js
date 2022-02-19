import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import usersSlice from './store/userSlice'
import questionsSlice from './store/questionsSlice'
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import showLoginSlice from "./store/showLoginSlice";

export const store = configureStore({
  reducer:{
    users:usersSlice,
    questions:questionsSlice,
    showLogin:showLoginSlice    
  },
})

ReactDOM.render(
  <Provider className="dark" store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

