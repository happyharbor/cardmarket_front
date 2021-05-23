import React, {useEffect, useState} from 'react';
import {config} from "../../constants";
import useToken from "../../hooks/useToken";

interface IRegister {
    username: string,
    password: string,
    role: string
}

interface IError {
    error: boolean,
    httpStatus?: number,
    errorMsg?: string
}

async function registerUser(credentials: IRegister,
                            setAlert: (alert: IError) => void,
                            token: string | null): Promise<IUserToken> {
    return fetch(`${config.url.API_URL}users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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
}

export default function Register() {
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [alert, setAlert] = useState<IError>({error: false});
    const {token} = useToken();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await registerUser({
            username,
            password,
            role
        }, setAlert, token);
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
            <h2>You may register a new user</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <label>
                    <p>Role</p>
                    <select value={role} onChange={e => setRole(e.target.value)}>
                        <option value="admin">Administrator</option>
                        <option value="user">User</option>
                    </select>
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
