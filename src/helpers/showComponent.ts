import GetAddresses from "../components/GetAddresses/GetAddresses";
import Register from "../components/Register/Register";
import UpdatePrices from "../components/UpdatePrices/UpdatePrices";

export default function showComponent(component: string, roles: string[] ): boolean {

    switch (component) {
        case GetAddresses.name:
            return true;
        case Register.name:
            return roles.includes("admin");
        case UpdatePrices.name:
            return roles.includes("admin");
        default:
            return false;
    }
}