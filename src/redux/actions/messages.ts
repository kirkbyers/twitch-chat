import { ADD_MESSAGE, ADD_STREAM, SELECT_STREAM } from "./actionTypes";
import { AnyAction } from "redux";
import { ChatMessage } from "../../interfaces/messages";
import twitchWebSocket from '../../shared/websockets';

export const addMessage = (message: ChatMessage): AnyAction => ({
    type: ADD_MESSAGE,
    payload: message
});

export const addStream = (stream: string): AnyAction => {
    twitchWebSocket.joinChannel(stream);
    return {
        type: ADD_STREAM,
        payload: stream
    }
};

export const selectStream = (stream: string): AnyAction => ({
    type: SELECT_STREAM,
    payload: stream
});
