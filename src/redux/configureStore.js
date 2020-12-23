import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
