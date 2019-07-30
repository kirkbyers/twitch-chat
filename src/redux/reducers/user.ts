import { AnyAction } from "redux";
import { UPDATE_USERNAME, UPDATE_OAUTHTOKEN } from "../actions/actionTypes";

export interface UserState {
    username: string;
    oauthToken: string;
}

const initState: UserState = {
    username: localStorage.getItem('userstore_username') || '',
    oauthToken: localStorage.getItem('userstore_oauthToken') || ''
};

export default function (state: UserState = initState, action: AnyAction): UserState {
    switch (action.type) {
        case UPDATE_USERNAME: {
            localStorage.setItem('userstore_username', action.payload);
            return {
                ...state,
                username: action.payload
            }
        }
        case UPDATE_OAUTHTOKEN: {
            localStorage.setItem('userstore_oauthToken', action.payload)
            return {
                ...state,
                oauthToken: action.payload
            }
        }
        default:
            return state;
    }
}