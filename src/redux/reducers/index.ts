import messages, { MessageState } from './messages';
import user, { UserState } from './user';
import { combineReducers } from 'redux';

export interface RootReducer {
    messages: MessageState;
    user: UserState;
}

export default combineReducers<RootReducer>({
    messages,
    user,
});