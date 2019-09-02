import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';

import rootReducer from "./reducers";

const defaultStore = createStore(
    rootReducer,
    applyMiddleware(thunk),
);

export default defaultStore;