import { ADD_MESSAGE, ADD_STREAM, SELECT_STREAM } from "../actions/actionTypes";
import { ChatMessage } from "../../interfaces/messages";
import { AnyAction } from "redux";

export interface MessageState {
    chatMessages: ChatMessage[][];
    chatMessagesByStream: { [stream: string]: number };
    selectedStream: string;
}

const initState: MessageState = {
    chatMessages: [[]],
    chatMessagesByStream: {},
    selectedStream: '',
};

export default function (state: MessageState = initState, action: AnyAction): MessageState {
    switch (action.type) {
        case ADD_MESSAGE: {
            const newMessage = action.payload as ChatMessage;
            const newChatMessages = state.chatMessages[state.chatMessagesByStream[newMessage.stream]].slice();
            newChatMessages.push(newMessage);
            const newState = Object.assign({}, state);
            newState.chatMessages[state.chatMessagesByStream[newMessage.stream]] = newChatMessages;
            return newState;
        }
        case ADD_STREAM: {
            const newState = Object.assign({}, state);
            const newStreamMessagesId = newState.chatMessages.push([]) - 1;
            newState.chatMessagesByStream[action.payload] = newStreamMessagesId;
            return newState;
        }
        case SELECT_STREAM: {
            return {
                ...state,
                selectedStream: action.payload,
            }
        }
        default:
            return state;
    }
}
