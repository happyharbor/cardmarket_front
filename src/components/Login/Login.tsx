import React, {useEffect, useState} from 'react';
import './Login.css';
import {config} from "../../constants";

interface ICredentials {
    username: string,
    password: string
}

interface IError {
    error: boolean,
    httpStatus?: number,
    errorMsg?: string
}

async function loginUser(credentials: ICredentials, setAlert: (alert: IError) => void): Promise<IUserToken> {
    return fetch(`${config.url.API_URL}users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
        .then(json => {
            if (json.error !== undefined) {
                setAlert({error: true, httpStatus: json.status, errorMsg: JSON.stringify(json)});
                return null;
            }
            return json;
        })
        .catch(reason => {
            setAlert({error: true, httpStatus: 500, errorMsg: reason.message});
            return null;
        })
}

async function getUser(token: string): Promise<IUser> {
    return fetch(`${config.url.API_URL}users/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(data => data.json())
}

export default function Login({changeUser}: { changeUser: (token: IUserToken, user: IUser) => void }) {
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [alert, setAlert] = useState<IError>({error: false});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        }, setAlert);

        if (token === null) {
            return;
        }
        const user = await getUser(token.token);
        changeUser(token, user)
    }

    useEffect(() => {
        if(alert.error) {
            setTimeout(() => {
                setAlert({error: false});
            }, 10000)
        }
    }, [alert])

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit" style={{marginTop: "20px"}}>Submit</button>
                    {alert.error &&
                    <div>
                        <p>Status:{alert.httpStatus}</p>
                        <p>Message: {alert.errorMsg}</p>
                    </div>}
                </div>
            </form>
        </div>
    )
}
