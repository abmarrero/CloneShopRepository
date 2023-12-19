
import { IUser } from '@/Interfaces';
import { createContext } from 'react';


interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;

    loginUser: (email: string, password: string) => Promise<boolean>;
}


export const AuthContext = createContext({} as ContextProps );