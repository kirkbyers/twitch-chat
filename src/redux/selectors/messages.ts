import { RootReducer } from "../reducers";

export const getMessagesState = (store: RootReducer) => store.messages;
export const getChatMessages = (store: RootReducer) => getMessagesState(store).chatMessages;
export const getStreams = (store: RootReducer) => Object.keys(getMessagesState(store).chatMessagesByStream);
export const getSelectedStream = (store: RootReducer) => getMessagesState(store).selectedStream;
export const getSelectedStreamId = (store: RootReducer) => {
    const selectedStream = getSelectedStream(store);
    if (!selectedStream) {
        return -1;
    }
    return getMessagesState(store).chatMessagesByStream[selectedStream];
}
export const getSelectedStreamMessages = (store: RootReducer) => {
    const selectedStreamID = getSelectedStreamId(store);
    if (selectedStreamID < 0) {
        return [];
    }
    return getChatMessages(store)[selectedStreamID];
}
