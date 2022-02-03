import React from "react";
import { AppRouter } from "./routes/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./styles.css";

export const TableApp = () => {
  return (
    <>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </>
  );
};
