import { ChatMessage } from "../../interfaces/messages";
import twitchWebSocket from '../../shared/websockets';

export interface AddMessageAction {
    type: 'ADD_MESSAGE';
    payload: ChatMessage;
}

export const addMessage = (message: ChatMessage): AddMessageAction => ({
    type: 'ADD_MESSAGE',
    payload: message
});

export interface AddStreamAction {
    type: 'ADD_STREAM';
    payload: string;
}

export const addStream = (stream: string): AddStreamAction => {
    twitchWebSocket.joinChannel(stream);
    return {
        type: 'ADD_STREAM',
        payload: stream,
    }
};

export interface SelectStreamAction {
    type: 'SELECT_STREAM';
    payload: string;
}

export const selectStream = (stream: string): SelectStreamAction => ({
    type: 'SELECT_STREAM',
    payload: stream,
});

export type MessageActions =
    AddMessageAction |
    SelectStreamAction |
    AddStreamAction;
