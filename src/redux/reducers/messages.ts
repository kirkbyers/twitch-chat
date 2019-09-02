import { MessageActions } from "../actions/messages";
import { ChatMessage, ChatMessagesStats } from "../../interfaces/messages";

export interface MessageState {
    chatMessages: ChatMessage[][];
    chatMessagesStats: ChatMessagesStats[];
    chatMessagesStatsIntervals: NodeJS.Timeout[];
    chatMessagesByStream: { [stream: string]: number };
    selectedStream: string;
}

const loadLocalStorageStreams = (): { [stream: string]: number } => {
    const localStorageStreams = localStorage.getItem('messages_streams') || '[]';
    const streamsArray: string[] = JSON.parse(localStorageStreams);
    return streamsArray.reduce((result: { [stream: string]: number }, stream, index) => {
        result[stream] = index;
        return result;
    }, {});
}

const saveStreamLocalStorage = (inp: { [stream: string]: number }): void => {
    const streamsArray = Object.keys(inp);
    localStorage.setItem('messages_streams', JSON.stringify(streamsArray));
}

const savedStreams = loadLocalStorageStreams();
const savedStreamMessage = Object.keys(savedStreams).map(() => []);

const initState: MessageState = {
    chatMessages: savedStreamMessage.slice(),
    chatMessagesStats: [],
    chatMessagesStatsIntervals: [],
    chatMessagesByStream: savedStreams,
    selectedStream: localStorage.getItem('messages_selectedStream') || '',
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
            saveStreamLocalStorage(newState.chatMessagesByStream);
            return newState;
        }
        case 'SELECT_STREAM': {
            localStorage.setItem('messages_selectedStream', action.payload);
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
            delete newState.chatMessagesStats[streamMessagesId];
            clearInterval(newState.chatMessagesStatsIntervals[streamMessagesId]);
            delete newState.chatMessagesStatsIntervals[streamMessagesId];
            saveStreamLocalStorage(newState.chatMessagesByStream);
            return newState;
        }
        case 'UPDATE_MESSAGES_STATS': {
            const streamId = state.chatMessagesByStream[action.payload.stream];
            const newState = Object.assign({}, state);
            newState.chatMessagesStats[streamId] = action.payload.stats;
            return newState;
        }
        case 'ADD_MESSAGES_STATS_INTERVAL': {
            const streamId = state.chatMessagesByStream[action.payload.stream];
            const newState = Object.assign({}, state);
            newState.chatMessagesStatsIntervals[streamId] = action.payload.interval;
            return newState;
        }
        case 'REMOVE_MESSAGES_STATS_INTERVAL': {
            const streamId = state.chatMessagesByStream[action.payload];
            const newState = Object.assign({}, state);
            const statsInterval = newState.chatMessagesStatsIntervals[streamId];
            clearInterval(statsInterval);
            delete newState.chatMessagesStatsIntervals[streamId];
            return newState;
        }
        default:
            return state;
    }
}
