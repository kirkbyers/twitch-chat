import { RootReducer } from "../reducers";
import { createSelector } from "reselect";

export const getMessagesState = (store: RootReducer) => store.messages;
export const getChatMessages = createSelector(getMessagesState, (messageState) => messageState.chatMessages);
export const getStreams = createSelector(getMessagesState, (messageState) => Object.keys(messageState.chatMessagesByStream));
export const getSelectedStream = createSelector(getMessagesState, (messageState) => messageState.selectedStream);
export const getSelectedStreamId = createSelector(getMessagesState, getSelectedStream, (messageState, selectedStream) => {
    if (!selectedStream) {
        return -1;
    }
    return messageState.chatMessagesByStream[selectedStream];
});

// Dont memoize getSelectedStreamMessages
export const getSelectedStreamMessages = (store: RootReducer) => {
    const selectedStreamID = getSelectedStreamId(store);
    if (selectedStreamID < 0) {
        return [];
    }
    const selectedStreamMessages = getChatMessages(store)[selectedStreamID];
    if (selectedStreamMessages.length < 100) {
        return selectedStreamMessages;
    }
    return selectedStreamMessages.slice(selectedStreamMessages.length - 101, selectedStreamMessages.length);
}

export const getChatMessagesStats = createSelector(getMessagesState, (messagesState) => messagesState.chatMessagesStats);

// Dont memoize getSelectedStreamChatMessagesStats
export const getSelectedStreamChatMessagesStats = (store: RootReducer) => {
    const defaultStats = {
        messagesPerS: 0,
        messagesPerSOver10: [],
        messagesPerSOver10Avg: 0
    };
    const selectedStreamID = getSelectedStreamId(store);
    if (selectedStreamID < 0) {
        return defaultStats;
    }
    return getChatMessagesStats(store)[selectedStreamID] || defaultStats;
}
export const getSelectedStreamMessagesPerSOver10 = createSelector(getSelectedStreamChatMessagesStats, (stats) => stats.messagesPerSOver10);
export const getChatMessagesStatsIntervals = createSelector(getMessagesState, (messsagesState) => messsagesState.chatMessagesStatsIntervals);
