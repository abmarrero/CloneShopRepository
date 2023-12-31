 
 import { IUser } from '@/Interfaces';
import { AuthState } from './';
 
 
 type AuthActionType = 
  | { type: '[Auth] - LogIn', payload: IUser} 
  | { type: '[Auth] - LogOut'} 
 
 
 export const authReducer = ( state:AuthState, action: AuthActionType): AuthState => {
 
  switch (action.type) {
   case '[Auth] - LogIn':
    return {
     ...state,
     isLoggedIn: true,
     user: action.payload   
    }
   case '[Auth] - LogOut':
    return {
     ...state,
     isLoggedIn: false,
     user: {} as IUser   
    }
 
   default:
    return state;
 
  }
 
 }