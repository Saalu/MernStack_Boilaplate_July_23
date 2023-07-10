import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "materialize-css/dist/css/materialize.min.css";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "./reducers";

const createStoreWithMiddleware = applyMiddleware;

const store = createStore(Reducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Provider
  //   store={createStoreWithMiddleware(
  //     Reducer,
  //     window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //       window.__REDUX_DEVTOOLS_EXTENSION__()
  //   )}
  // >
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </Provider>
);
