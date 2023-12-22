import React, { createContext, useReducer } from 'react';
import { LOGIN, LOGOUT } from 'utils/constants';

export const AuthContext = createContext();

const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            console.log(action.payload);

            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
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
