
import React, { FC, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/Interfaces';


export interface AuthState {
    isLoggedIn: boolean;
    user: IUser;
}


const Auth_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: {} as IUser   
}


interface Props {
children?: React.ReactNode | undefined;
}


export const AuthProvider:FC<Props>  = ({ children }) => {

    const [state, dispatch] = useReducer( authReducer , Auth_INITIAL_STATE );

    return (<AuthContext.Provider value={{
           ...state,
        
        }}>
            { children }
        </AuthContext.Provider>
    )
};