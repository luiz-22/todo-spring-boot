import { createContext, ReactNode, useState, useEffect } from 'react';
import { getUserInfo } from '../services/api';

interface User {
    id: number | string;
    name: string;
    email: string;
    image?: string;
}

interface AuthContextType {
    user: User | null;
    handleLogout: () => void;
    googleLogin: () => void;
    githubLogin: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    handleLogout: () => { },
    googleLogin: () => { },
    githubLogin: () => { },
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUserInfo = async () => {
        const data = await getUserInfo();
        setUser(data);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const isLogged = queryParams.get('logged');

        if (isLogged) {
            fetchUserInfo();
        }
    }, []);

    const handleLogout = () => {
        //window.location.href = 'http://localhost:8080/logout';
        window.location.href = 'https://api-todo-sp-latest.onrender.com/logout';
    };


    const googleLogin = () => {
        //window.location.href = 'http://localhost:8080/oauth2/authorization/google'
        window.location.href = 'https://api-todo-sp-latest.onrender.com/oauth2/authorization/google'
    }

    const githubLogin = () => {
        //window.location.href = 'http://localhost:8080/oauth2/authorization/github'
        window.location.href = 'https://api-todo-sp-latest.onrender.com/oauth2/authorization/github'
    }

    return (
        <AuthContext.Provider value={{ user, handleLogout, googleLogin, githubLogin }}>
            {children}
        </AuthContext.Provider>
    );
};