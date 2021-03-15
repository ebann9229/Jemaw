import React, {createContext, useReducer} from 'react';

import reducer from './reducer';

export const storeContext = createContext();

const initialState = {
    authenticated: false,
    loadingUser: false,
    loadingData:false,
    loading:false,
    user: {},
    errors: {},
    credentials: {},
    likes: [],
    notifications: [],
    posts: [],
};

export const StateProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <storeContext.Provider value={[state, dispatch]}>
            {children}
        </storeContext.Provider>
);
};
