import { ChatMessage, ChatMessagesStats } from "../../interfaces/messages";
import { Dispatch } from "redux";
import { RootReducer } from "../reducers/index";

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

export const addStream = (stream: string): (d: Dispatch, s: () => RootReducer) => void => {
    return (dispatch, getState) => {
        dispatch({ type: 'ADD_STREAM', payload: stream });
        const statsInterval = setInterval(() => {
        }, 1000);
        dispatch({
            type: 'ADD_MESSAGES_STATS_INTERVAL',
            payload: {
                stream,
                interval: statsInterval,
            }
        });
    };
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

export interface UpdateMessagesStatsAction {
    type: 'UPDATE_MESSAGES_STATS';
    payload: {
        stream: string;
        stats: ChatMessagesStats;
    };
}

export const updateMessagesStats = (stream: string, streamMessagesStats: UpdateMessagesStatsAction) => ({
    type: 'UPDATE_MESSAGES_STATS',
    payload: {
        stream,
        stats: streamMessagesStats,
    }
});

export interface AddMessagesStatsIntervalAction {
    type: 'ADD_MESSAGES_STATS_INTERVAL';
    payload: {
        stream: string;
        interval: NodeJS.Timeout;
    };
}

export const addMessagesStatsInterval = (stream: string, interval: NodeJS.Timeout) => ({
    type: 'ADD_MESSAGES_STATS_INTERVAL',
    payload: {
        stream,
        interval,
    }
});

export interface RemoveMessagesStatsIntervalAction {
    type: 'REMOVE_MESSAGES_STATS_INTERVAL';
    payload: string;
}

export const RemoveMessagesStatsInterval = (stream: string) => ({
    type: 'REMOVE_MESSAGES_STATS_INTERVAL',
    payload: stream,
});

export type MessageActions =
    RemoveMessagesStatsIntervalAction |
    AddMessagesStatsIntervalAction |
    UpdateMessagesStatsAction |
    LeaveStreamAction |
    AddMessageAction |
    SelectStreamAction |
    AddStreamAction;
