import { ADD_MESSAGE } from "../actions/actionTypes";
import { ChatMessage } from "../../interfaces/messages";
import { AnyAction } from "redux";

export interface MessageState {
    chatMessages: ChatMessage[];
}

const initState: MessageState = {
    chatMessages: []
};

export default function (state: MessageState = initState, action: AnyAction): MessageState {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                chatMessages: [...state.chatMessages, action.payload]
            };
        default:
            return state;
    }
}
