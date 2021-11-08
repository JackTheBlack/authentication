import { createStore, combineReducers } from "redux";
import counterReducer from "../reducer/counterReducer.js";
import logReducer from "../reducer/logReducer.js";

const appReducer = combineReducers({
  counterReducer: counterReducer,
  logReducer: logReducer,
});

export default createStore(appReducer);
