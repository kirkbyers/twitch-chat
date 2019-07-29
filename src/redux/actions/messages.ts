import { ADD_MESSAGE, ADD_STREAM, SELECT_STREAM } from "./actionTypes";
import { AnyAction } from "redux";
import { ChatMessage } from "../../interfaces/messages";

export const addMessage = (message: ChatMessage): AnyAction => ({
    type: ADD_MESSAGE,
    payload: message
});

export const addStream = (stream: string): AnyAction => ({
    type: ADD_STREAM,
    payload: stream
});

export const selectStream = (stream: string): AnyAction => ({
    type: SELECT_STREAM,
    payload: stream
});
