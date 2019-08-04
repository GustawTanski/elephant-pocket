import { combineReducers, createStore } from "redux";
import xTokenReducers from "./xToken/reducers";

const reducer = combineReducers({...xTokenReducers});
const store = createStore(reducer);

export default store;

const state = store.getState();

export type storeType = typeof state;