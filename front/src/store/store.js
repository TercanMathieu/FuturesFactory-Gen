import React, {createContext, useContext, useReducer} from 'react';

const initialState = {
    Wallet: '',
    Image: '',

};

const reducer = (state, action) => {
    switch (action.type) {
        case 'Login':
            return {
                ...state,
                Wallet: action.account
            };
        case 'Send':
            return {
                ...state,
                Image: action.image
            };

        default:
            return state;
    }
};

const ThemeContext = createContext();

export const ThemeConsumer = ThemeContext.Consumer;
export const ThemeConsumerHook = () => useContext(ThemeContext);

export const ThemeProvider = ({children}) => (
    <ThemeContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </ThemeContext.Provider>
);
