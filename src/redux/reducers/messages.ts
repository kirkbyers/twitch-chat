import { MessageActions } from "../actions/messages";
import { ChatMessage } from "../../interfaces/messages";

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

export default function (state: MessageState = initState, action: MessageActions): MessageState {
    switch (action.type) {
        case 'ADD_MESSAGE': {
            const newMessage = action.payload as ChatMessage;
            const newChatMessages = state.chatMessages[state.chatMessagesByStream[newMessage.stream]].slice();
            newChatMessages.push(newMessage);
            const newState = Object.assign({}, state);
            newState.chatMessages[state.chatMessagesByStream[newMessage.stream]] = newChatMessages;
            return newState;
        }
        case 'ADD_STREAM': {
            const newState = Object.assign({}, state);
            const newStreamMessagesId = newState.chatMessages.push([]) - 1;
            newState.chatMessagesByStream[action.payload] = newStreamMessagesId;
            if (newState.chatMessages.length <= 1) {
                newState.selectedStream = action.payload;
            }
            return newState;
        }
        case 'SELECT_STREAM': {
            return {
                ...state,
                selectedStream: action.payload,
            }
        }
        case 'LEAVE_STREAM': {
            const newState = Object.assign({}, state);
            const streamMessagesId = newState.chatMessagesByStream[action.payload];
            delete newState.chatMessages[streamMessagesId];
            delete newState.chatMessagesByStream[action.payload];
            if (newState.selectedStream === action.payload) {
                newState.selectedStream = '';
            }
            return newState;
        }
        default:
            return state;
    }
}
