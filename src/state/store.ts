import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

// The second argument ({}) is for the initial state of the store.
export const store = createStore(reducers, {}, applyMiddleware(thunk));
