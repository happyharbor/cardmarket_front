import React from 'react';

import UpdatePrices from '../UpdatePrices/UpdatePrices';
import GetAddresses from '../GetAddresses/GetAddresses';
import {Link} from "react-router-dom";
import showComponent from "../../helpers/showComponent";
import Register from "../Register/Register";
import ShippedCardsPerMonth from "../CardsPerMonth/ShippedCardsPerMonth";

function Home({user}: { user: IUser }) {


    return (
        <div className="wrapper">
            {showComponent(GetAddresses.name, user.roles) && <GetAddresses/>}
            {showComponent(ShippedCardsPerMonth.name, user.roles) && <ShippedCardsPerMonth/>}
            {showComponent(UpdatePrices.name, user.roles) && <UpdatePrices/>}
            {showComponent(Register.name, user.roles) &&
            <Link to="/register" tabIndex={-1} style={{marginTop: "10px"}}>
                <button>Register User</button>
            </Link>}
        </div>
    );
}

export default Home;
