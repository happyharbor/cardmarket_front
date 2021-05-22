import React from 'react';

import './App.css';
import UpdatePrices from '../UpdatePrices/UpdatePrices';
import Login from '../Login/Login';
import GetAddresses from '../GetAddresses/GetAddresses';
import useToken from "../../hooks/useToken";
import useUser from "../../hooks/useUser";

function App() {
    const {token, setToken, removeToken} = useToken();
    const {user, setUser} = useUser();

    if (!token) {
        return <Login setToken={setToken} setUser={setUser}/>
    }

    return (
        <div className="wrapper">
            <h1>Application</h1>
            <div className="login-bar">
                <div>Hi {user.username},</div>
                <div>
                    <button onClick={removeToken}>
                        Logout
                    </button>
                </div>
            </div>
            <GetAddresses allowedRoles={["admin", "user"]}/>
            <UpdatePrices allowedRoles={["admin"]}/>
        </div>
    );
}

export default App;
