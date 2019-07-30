import { AnyAction } from "redux";
import { UPDATE_USERNAME, UPDATE_OAUTHTOKEN } from "./actionTypes";

export const updateUsername = (username: string): AnyAction => ({
    type: UPDATE_USERNAME,
    payload: username
});

export const updateOauthToken = (oauthToken: string): AnyAction => ({
    type: UPDATE_OAUTHTOKEN,
    payload: oauthToken
});
