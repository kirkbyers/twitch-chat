import messages, { MessageState } from "./messages";
import { combineReducers } from "redux";

export interface RootReducer {
    messages: MessageState;
}

export default combineReducers<RootReducer>({ messages });