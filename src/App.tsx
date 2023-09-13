import React, {useEffect, useState} from 'react';

interface ICurrency {
    Date: string;
    PreviousDate: string;
    PreviousURL: string;
    Timestamp: string;
    Valute: { [key: string]: IValute };
}

interface IValute {
    ID: string;
    NumCode: string;
    CharCode: string;
    Nominal: number;
    Name: string;
    Value: number;
    Previous: number;
}

function App() {
    const [currency, setCurrency] = useState<ICurrency>();

    useEffect(() => {
        fetch('https://www.cbr-xml-daily.ru/daily_json.js')
            .then((response) => response.json())
            .then((data) => {
                if (data.Valute) {
                    setCurrency(data);
                }
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <h1>Конвертер валют</h1>
            <div>
                <select>
                    {currency?.Valute &&
                        Object.values(currency.Valute).map((valute) => (
                            <option value={`${valute.Name} ${valute.CharCode}`}
                                    key={valute.CharCode}>{valute.CharCode} {valute.Name}</option>
                        ))}
                </select>
                <marquee>
                    {currency?.Valute && Object.values(currency.Valute).map(value => {
                        `${value.Name}`
                    })}
                </marquee>
            </div>
            <h2>by Nikita Pavlushin</h2>
        </>
    );
}

export default App;
