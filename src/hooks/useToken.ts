import {useState} from "react";
import {config} from "../constants";

export default function useToken(): { setToken: (userToken: IUserToken) => void, removeToken: () => void, token: string | null } {

    const reviveDateTime = (key: any, value: any): any => {
        if (typeof value === 'string')
        {
            let a = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.exec(value);
            if (a)
            {
                return new Date(a[0]);
            }
        }

        return value;
    }

    const getToken = (): string | null => {
        const tokenString = localStorage.getItem('token');
        const userToken = tokenString === null ? null : JSON.parse(tokenString, reviveDateTime);

        if (userToken === null || userToken.expiry === null) {
            return null;
        }
        const now = new Date();
        if (userToken.expiry.getTime() > now.getTime()) {
            return userToken.token;
        } else {
            localStorage.removeItem('token');
            return null;
        }
    };

    const [token, setToken] = useState<string | null>(getToken());

    const saveToken = (userToken: IUserToken) => {
        const now = new Date();
        now.setSeconds(now.getSeconds() + config.ttl)
        userToken.expiry = now;
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