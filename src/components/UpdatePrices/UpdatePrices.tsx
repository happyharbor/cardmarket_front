import React, {useEffect, useState} from 'react';
import useToken from "../../hooks/useToken";
import {config} from "../../constants";
import useUser from "../../hooks/useUser";

export default function UpdatePrices({allowedRoles}: {allowedRoles: string[]}) {
    const [alert, setAlert] = useState<boolean>(false);
    const {token} = useToken();
    const {user} = useUser();
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        if(alert) {
            setTimeout(() => {
                setAlert(false);
            }, 10000)
        }
    }, [alert])

    const onClick = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSubmitting(true);
        return fetch(`${config.url.API_URL}stock/update-prices`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(() => {
                setSubmitting(false);
                setAlert(true);
            })
    };

    if (user.roles.filter(role => allowedRoles.includes(role)).length === 0) {
        return null;
    }

    return (
        <div className="child-wrapper">
            <button disabled={submitting} onClick={onClick}>
                Update Prices
            </button>
            {alert && <p>Update successful</p>}
        </div>
    );
}