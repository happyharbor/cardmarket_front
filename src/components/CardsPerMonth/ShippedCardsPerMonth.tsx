import React, {useEffect, useState} from 'react';
import useToken from "../../hooks/useToken";
import {getEnumKeyByEnumValue} from "../../enums";
import './ShippedCardsPerMonth.css';
import {config} from "../../constants";
import {ClipLoader} from "react-spinners";

interface IError {
    error: boolean,
    httpStatus?: number,
    errorMsg?: string
}

enum EMonth {
    January = "JANUARY",
    February = 'FEBRUARY',
    March = 'MARCH',
    April = 'APRIL',
    May = 'MAY',
    June = 'JUNE',
    July = 'JULY',
    August = 'AUGUST',
    September = 'SEPTEMBER',
    October = 'OCTOBER',
    November = 'NOVEMBER',
    December = 'DECEMBER'
}

export default function ShippedCardsPerMonth() {
    const {token} = useToken();
    const [data, setData] = useState<{ numberOfCards: number, month: EMonth }[]>()
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [alert, setAlert] = useState<IError>({error: false});

    const onClick = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setData(undefined)
        setSubmitting(true);

        fetch(`${config.url.API_URL}order/number-cards-per-month?months=january,february,march,april,may,june,july,august,september,october,november,december`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(callData => callData.json())
            .then(json => {
                setSubmitting(false);
                if (json.error !== undefined) {
                    setAlert({error: true, httpStatus: json.status, errorMsg: JSON.stringify(json)});
                    return null;
                }
                setData(json.noCardsInMonth)
            })
            .catch(reason => {
                setAlert({error: true, httpStatus: 500, errorMsg: reason.message});
                setSubmitting(false);
                return null;
            })
    };

    useEffect(() => {
        if (alert.error) {
            setTimeout(() => {
                setAlert({error: false});
            }, 10000)
        }
    }, [alert])

    const NumberOfCards = (cards: { numberOfCards: number, month: EMonth }[]) => (
        <>
            {cards.map(card => (
                <tr>
                    <td>{getEnumKeyByEnumValue(EMonth, card.month)}</td>
                    <td>{card.numberOfCards}</td>
                </tr>
            ))}
        </>
    );

    return (
        <div>
            <button disabled={submitting} onClick={onClick}>
                Shipped cards per month
            </button>
            <div className='cliploader'>
                <ClipLoader loading={submitting}/>
            </div>
            {data &&
            <div className="shipped-cards-table">
                <table>
                    <tr>
                        <th>Month</th>
                        <th>Cards</th>
                    </tr>
                    {NumberOfCards(data)}
                </table>
            </div>}
            {alert.error &&
            <div>
                <p>Status:{alert.httpStatus}</p>
                <p>Message: {alert.errorMsg}</p>
            </div>}
        </div>
    );
}
