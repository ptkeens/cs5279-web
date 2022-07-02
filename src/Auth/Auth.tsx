import { useState, useEffect, createContext, useContext } from 'react';
import { Navigate } from "react-router-dom";

const authContext = createContext<authInterface>({} as authInterface);
const tokenName = 'vdas_token';

export interface authInterface {
    token: string|undefined,
    isLoggedIn: boolean,
    isAuthenticated: () => boolean,
    getToken: () => string|undefined,
    getTokenFromStorage: () => string,
    checkToken: (tkn: string|undefined) => Promise<void>,
    login: (email: string, password: string) => Promise<string>,
    logout: () => void
}

export const useAuth = () => {
    return useContext(authContext);
}

export const AuthProvider = ({children}: any) => {
    const auth = useProvideAuth();

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export const PrivateRoute = ({children, ...rest}: any) => {
    const auth = useAuth();

    if (!auth.isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export const AvoidIfAuthenticated = ({children, ...rest}: any) => {
    const auth = useAuth();
    
    if (auth.isAuthenticated()) {
        return <Navigate to="/" replace />;
    }

    return children;
}


export const useProvideAuth = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);
    const [ token, setToken ] = useState<string|undefined>();

    // setup a hook to keep the localStorage version of our token current
    useEffect(() => {
        let storedValue = localStorage.getItem(tokenName);
        console.log('useEffect being called for token change');
        if (token) {
            localStorage.setItem(tokenName, token);
        } else if (storedValue) {
            setToken(storedValue);
            setIsLoggedIn(true);
        }
    }, [token]);

    return {
        token,
        isLoggedIn,
        isAuthenticated : () => {
            return isLoggedIn;
        },
        
        getToken : () => {
            return token;
        },
       
        getTokenFromStorage : () => {
            return localStorage.getItem(tokenName);
        },

        checkToken : async (tkn : string|undefined) : Promise<void> => {

        },

        login: async (email: string, password: string) : Promise<string> => {
            const url = process.env.REACT_APP_BACKEND_HOST + '/auth/login';
            const data = new URLSearchParams();
            data.append('email', email);
            data.append('password', password);
    
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: data
                });
                
                if (response.status === 200) {
                    let responseData = await response.json();
                    setIsLoggedIn(true);
                    setToken(responseData.data.token);
                    return responseData.data.token;
                } else {
                    switch (response.status) {
                        case 404:
                            throw new Error('Resource not found!');
                        case 401:
                            throw new Error('Unauthorized');
                        case 500:
                            throw new Error('System Error');
                        default:
                            throw new Error('Error when contacting API server');
                    }
                }
            } catch (err) {
                console.log(err);
                throw err;
            }        
        },

        logout: () => {
            localStorage.removeItem(tokenName);
            setIsLoggedIn(false);
        }
    } as authInterface
}