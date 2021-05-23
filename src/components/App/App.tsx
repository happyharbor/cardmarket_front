import React from 'react';

import './App.css';
import Login from '../Login/Login';
import useToken from "../../hooks/useToken";
import useUser from "../../hooks/useUser";
import Register from "../Register/Register";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../Home/Home";
import showComponent from "../../helpers/showComponent";

function App() {
    const {token, setToken, removeToken} = useToken();
    const {user, setUser} = useUser();

    const changeUser = (userToken: IUserToken, iUser: IUser) => {
        setToken(userToken)
        setUser(iUser)
    }

    if (!token) {
        return <Login changeUser={changeUser}/>
    }

    return (
        <Router>
            <div className="wrapper">
                <h1>Cardmarket Application</h1>
                <div className="login-bar">
                    <div>Hi {user.username},</div>
                    <div>
                        <button onClick={removeToken}>
                            Logout
                        </button>
                    </div>
                </div>

                <Switch>
                    <Route path="/register">
                        {showComponent(Register.name, user.roles) && <Register/>}
                    </Route>
                    <Route path="/">
                        <Home user={user}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
