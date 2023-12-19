
import React, { FC, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/Interfaces';
import { cloneApi } from '@/api';
import Cookies from 'js-cookie';


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

    const loginUser = async(email:string, password:string):Promise<boolean> => {
        
        try {
               
            const {data} = await cloneApi.post('/user/login', {email, password});
            const {token, user} = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - LogIn', payload: user})
            return true;
        } catch (error) {
            return false;
        }
    }

    return (<AuthContext.Provider value={{
           ...state,
           
           loginUser,
        }}>
            { children }
        </AuthContext.Provider>
    )
};