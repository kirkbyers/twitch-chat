import { RootReducer } from '../reducers';

export const getUserState = (store: RootReducer) => store.user;
export const getUsername = (store: RootReducer) => getUserState(store).username;
export const getOauthToken = (store: RootReducer) => getUserState(store).oauthToken;