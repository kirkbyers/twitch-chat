import { RootReducer } from '../reducers';
import { createSelector } from 'reselect';

export const getUserState = (store: RootReducer) => store.user;
export const getUsername = createSelector(getUserState, (userState) => userState.username);
export const getOauthToken = createSelector(getUserState, (userState) => userState.oauthToken);
export const getAutoLogin = createSelector(getUserState, (userState) => userState.autoLogin);
export const getIsLoggedIn = createSelector(getUserState, (userState) => userState.isLoggedIn);
