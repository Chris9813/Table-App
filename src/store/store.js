import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import { listReducer } from "../list/listReducer";
import { authReducer } from "../auth/authReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  list: listReducer,
  auth: authReducer,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
