import GetAddresses from "../components/GetAddresses/GetAddresses";
import Register from "../components/Register/Register";
import UpdatePrices from "../components/UpdatePrices/UpdatePrices";
import {ERole} from "../enums";
import ShippedCardsPerMonth from "../components/CardsPerMonth/ShippedCardsPerMonth";
import GetProductList from "../components/GetProductList/GetProductList";

export default function showComponent(component: string, roles: string[] ): boolean {

    switch (component) {
        case GetAddresses.name:
        case GetProductList.name:
        case ShippedCardsPerMonth.name:
            return true;
        case Register.name:
            return roles.includes(ERole.Admin);
        case UpdatePrices.name:
            return roles.includes(ERole.Admin);
        default:
            return false;
    }
}
