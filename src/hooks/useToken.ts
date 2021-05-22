import {useState} from "react";

export default function useToken(): { setToken: (userToken: IUserToken) => void, removeToken: () => void, token: string | null } {
    const getToken = (): string => {
        const tokenString = localStorage.getItem('token');
        const userToken = tokenString === null ? "" : JSON.parse(tokenString);
        return userToken?.token
    };

    const [token, setToken] = useState<string | null>(getToken());

    const saveToken = (userToken: IUserToken) => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    const deleteToken = () => {
        localStorage.removeItem('token');
        setToken(null)
    }

    return {
        setToken: saveToken,
        removeToken: deleteToken,
        token
    }
}