import React, {useEffect, useState} from 'react';
import {config} from "../../constants";
import useToken from "../../hooks/useToken";
import {ERole} from "../../enums";
import {useNavigate} from "react-router-dom";

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
            if (json.token === undefined) {
                setAlert({error: true, httpStatus: json.status, errorMsg: JSON.stringify(json)});
                return null;
            }
            return json;
        })
}

export default function Register() {
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<string>(ERole.User);
    const [alert, setAlert] = useState<IError>({error: false});
    const {token} = useToken();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const iUserToken = await registerUser({
            username,
            password,
            role
        }, setAlert, token);
        if (iUserToken !== null && iUserToken.token !== undefined) {
            return navigate(-1)
        }
    }

    useEffect(() => {
        if (alert.error) {
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
                        <option value={ERole.User}>User</option>
                        <option value={ERole.Admin}>Administrator</option>
                    </select>
                </label>
                <div className="register-btn">
                    <span className="child-wrapper">
                        <button type="submit" style={{marginTop: "20px"}}>Submit</button>
                    </span>
                    <span className="child-wrapper">
                        <button onClick={() => navigate(-1)}>Back</button>
                    </span>
                </div>
                {alert.error &&
                    <div>
                        <p>Status:{alert.httpStatus}</p>
                        <p>Message: {alert.errorMsg}</p>
                    </div>}
            </form>
        </div>
    )
}
