import {useState} from "react";

export default function useUser(): { setUser: (user: IUser) => void, user: IUser } {
    const getUser = (): IUser => {
        const userString = localStorage.getItem('user');
        return userString === null ? {roles: []} : JSON.parse(userString);
    };

    const [user, setUser] = useState<IUser>(getUser());

    const saveUser = (newUser: IUser) => {
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    };

    return {
        setUser: saveUser,
        user: user
    }
}