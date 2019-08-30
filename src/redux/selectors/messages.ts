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
    return getChatMessages(store)[selectedStreamID];
}
