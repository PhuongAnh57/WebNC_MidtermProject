import React, { createContext, useReducer } from 'react';
import { LOGIN, LOGOUT, REFRESH_TOKEN, RELOAD_PAGE } from 'utils/constants';

export const AuthContext = createContext();

const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('userID', action.payload.user.user_id);
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);

            return {
                ...state,
                user: action.payload.user.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        case REFRESH_TOKEN:
            localStorage.removeItem('accessToken');
            localStorage.setItem('accessToken', action.payload.accessToken);

            return {
                ...state,
                accessToken: action.payload.accessToken,
            };

        case RELOAD_PAGE:
            return {
                ...state,
                user: action.payload.userData,
                accessToken: localStorage.getItem('accessToken'),
                refreshToken: localStorage.getItem('refreshToken'),
            };

        case LOGOUT:
            localStorage.clear();

            return {
                ...state,
                user: null,
                accessToken: null,
                refreshToken: null,
            };
        default:
            return state;
    }
};

function AuthProvider({ children }) {
    const [user, dispatch] = useReducer(reducer, initialState);

    return <AuthContext.Provider value={{ user, dispatch }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
