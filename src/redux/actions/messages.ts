import { ChatMessage, ChatMessagesStats } from "../../interfaces/messages";
import { Dispatch } from "redux";
import { RootReducer } from "../reducers/index";
import { getMessagesState } from "../selectors/messages";

export interface AddMessageAction {
    type: 'ADD_MESSAGE';
    payload: ChatMessage;
};

export const addMessage = (message: ChatMessage): (d: Dispatch, s: () => RootReducer) => void => {
    return (dispatch, getState) => {
        dispatch({ type: 'ADD_MESSAGE', payload: message });
        const { chatMessagesByStream, chatMessagesStats } = getMessagesState(getState());
        const streamId = chatMessagesByStream[message.stream];
        const oldStats = chatMessagesStats[streamId] || {
            messagesPerS: 0,
            messagesPerSOver10: [],
            messagesPerSOver10Avg: 0
        };
        const newStats = Object.assign({}, oldStats);
        newStats.messagesPerS++;
        dispatch(updateMessagesStats(message.stream, newStats));
    }
};

export interface AddStreamAction {
    type: 'ADD_STREAM';
    payload: string;
};

export const addStream = (stream: string): (d: Dispatch, s: () => RootReducer) => void => {
    return (dispatch, getState) => {
        dispatch({ type: 'ADD_STREAM', payload: stream });
        const statsInterval = setInterval(() => {
            const { chatMessagesByStream, chatMessagesStats } = getMessagesState(getState());
            const streamId = chatMessagesByStream[stream];
            const oldStats = chatMessagesStats[streamId] || {
                messagesPerS: 0,
                messagesPerSOver10: [],
                messagesPerSOver10Avg: 0
            };
            const newStats = Object.assign({}, oldStats);
            newStats.messagesPerS = 0;
            newStats.messagesPerSOver10.push(oldStats.messagesPerS);
            if (newStats.messagesPerSOver10.length > 10) {
                const removedMetrics = newStats.messagesPerSOver10.splice(0, 1);
                newStats.messagesPerSOver10Avg -= removedMetrics[0] / 10;
            }
            newStats.messagesPerSOver10Avg += oldStats.messagesPerS / 10
            dispatch(updateMessagesStats(stream, newStats));
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

export const updateMessagesStats = (stream: string, streamMessagesStats: ChatMessagesStats) => ({
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
