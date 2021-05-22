import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import {config} from "../../constants";

interface ICredentials {
    username: string,
    password: string
}

async function loginUser(credentials: ICredentials): Promise<IUserToken> {
    return fetch(`${config.url.API_URL}users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
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

export default function Login({setToken, setUser}: { setToken: (userToken: IUserToken) => void, setUser: (user: IUser) => void }) {
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
        const user = await getUser(token.token);
        setUser(user);
    }

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
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};