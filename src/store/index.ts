import { combineReducers, createStore } from "redux";

import todo from "./todo/reducers";

const reducers = combineReducers({
  todo
});

const makeStore = () => {
  const store = createStore(reducers);

  return store;
};

export default makeStore();