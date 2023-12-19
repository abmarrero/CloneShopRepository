
import React, { FC, useEffect, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/Interfaces';
import { cloneApi } from '@/api';
import Cookies from 'js-cookie';
import axios, { isAxiosError } from 'axios';


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
    
    
    const checkToken = async() => {
        if( !Cookies.get('token')){
            return;
        }
        try {
            
            const {data} = await cloneApi.get('/user/validate-token');
            const {token, user} = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - LogIn', payload: user})
            
        } catch (error) {
            Cookies.remove('token');
        }
    };
    
    useEffect(() => {
      checkToken();
    }, [])


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

    const registerUser = async(email:string, password:string, name:string):Promise<{hasError:boolean; message?:string}> => {
        
        try { 
            const {data} = await cloneApi.post('/user/register', {email, password,name});
            const {token, user} = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - LogIn', payload: user})
            return {
                hasError: false,
            }
        } catch (error) {
            if(axios.isAxiosError(error)) {
            return {
                hasError: false,
                message: error.response?.data.message
            }
        }
        return {
            hasError: false,
            message: 'no se puede crear el usuario - intente de nuevo'
        }
      }
    }

    return (<AuthContext.Provider value={{
           ...state,
           
           loginUser,
           registerUser
        }}>
            { children }
        </AuthContext.Provider>
    )
};