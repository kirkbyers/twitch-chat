import { ChatMessage } from "../../interfaces/messages";

export interface AddMessageAction {
    type: 'ADD_MESSAGE';
    payload: ChatMessage;
};

export const addMessage = (message: ChatMessage): AddMessageAction => ({
    type: 'ADD_MESSAGE',
    payload: message
});

export interface AddStreamAction {
    type: 'ADD_STREAM';
    payload: string;
};

export const addStream = (stream: string): AddStreamAction => {
    return {
        type: 'ADD_STREAM',
        payload: stream,
    }
};

export interface LeaveStreamAction {
    type: 'LEAVE_STREAM';
    payload: string;
};

export const leaveStream = (stream: string): LeaveStreamAction => {
    return {
        type: 'LEAVE_STREAM',
        payload: stream,
    };
}

export interface SelectStreamAction {
    type: 'SELECT_STREAM';
    payload: string;
};

export const selectStream = (stream: string): SelectStreamAction => ({
    type: 'SELECT_STREAM',
    payload: stream,
});

export type MessageActions =
    LeaveStreamAction |
    AddMessageAction |
    SelectStreamAction |
    AddStreamAction;
