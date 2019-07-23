import { ADD_MESSAGE } from "./actionTypes";
import { AnyAction } from "redux";
import { ChatMessage } from "../../interfaces/messages";

export const addMessage = (message: ChatMessage): AnyAction => ({
    type: ADD_MESSAGE,
    payload: message
});
