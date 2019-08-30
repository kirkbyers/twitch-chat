export interface UpdateUsernameAction {
    type: 'UPDATE_USERNAME';
    payload: string;
}

export const updateUsername = (username: string): UpdateUsernameAction => ({
    type: 'UPDATE_USERNAME',
    payload: username
});

export interface UpdateOauthTokenAction {
    type: 'UPDATE_OAUTHTOKEN';
    payload: string;
}

export const updateOauthToken = (oauthToken: string): UpdateOauthTokenAction => ({
    type: 'UPDATE_OAUTHTOKEN',
    payload: oauthToken
});

export interface UpdateAutoLoginAction {
    type: 'UPDATE_AUTOLOGIN';
    payload: boolean;
}

export const updateAutoLogin = (autoLogin: boolean): UpdateAutoLoginAction => ({
    type: 'UPDATE_AUTOLOGIN',
    payload: autoLogin
});

export type UserActions =
    UpdateUsernameAction |
    UpdateOauthTokenAction |
    UpdateAutoLoginAction;
