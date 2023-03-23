import React,{createContext} from 'react';

export interface AuthState{
    isLoggedIn: boolean,
    userName: string,
    userID: string,
    domainName: string
}

export const authInitialState: AuthState= {
    isLoggedIn: false,
    userName: undefined,
    userID: undefined,
    domainName: '192.168.1.173:8080/'
}

export interface AuthContextProps{
    authState: AuthState;
    signIn: ()=>void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider= ({children}: any) => {
    return(
        <AuthContext.Provider value={{
            authState: authInitialState,
            signIn: ()=>{}
        }}>
            {children}
        </AuthContext.Provider>
    );
}
