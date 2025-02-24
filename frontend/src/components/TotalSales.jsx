import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function TotalSales() {
    const [month, setMonth] = useState();
    const [sales, setSales] = useState({});

    const getData = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3000/api/product/getMonthSales?month=${month}`
            );
            setSales(res.data);
            console.log(sales);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        getData();
    }, [month]);

    const handelMonth = (e) => {
        setMonth(e.target.value);
    };

    return (
        <div className="max-w-full bg-blue-50 flex flex-col justify-center items-center">
            <div className="flex p-2">
                <h1 className="font-serif py-2 pr-2">Select Month:</h1>
                <select
                    value={month}
                    onChange={handelMonth}
                    className="bg-blue-100 p-1 rounded stroke-0 outline-0 cursor-pointer"
                >
                    <option value={""} disabled>
                        Select Month
                    </option>
                    {months.map((mon, key) => (
                        <option key={key} value={mon}>
                            {mon}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <table className="min-w-full m-4 bg-white shadow-md rounded-lg">
                    <tr className="border-b text-left">
                        <th className="px-4 py-2">Month</th>
                        <td className="px-4 py-2">{sales.Month}</td>
                    </tr>
                    <tr  className=" text-left">
                        <th className="px-4 py-2">Total Sold Items</th>
                        <td className="px-4 py-2">${sales.totalSoldSales}</td>
                    </tr>
                    <tr  className=" text-left">
                        <th className="px-4 py-2">Total UnSold Items</th>
                        <td className="px-4 py-2">${sales.totalUnSoldSales}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default TotalSales;
