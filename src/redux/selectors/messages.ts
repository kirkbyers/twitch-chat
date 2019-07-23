import { RootReducer } from "../reducers";

export const getMessagesState = (store: RootReducer) => store.messages;
export const getChatMessages = (store: RootReducer) => getMessagesState(store).chatMessages;
