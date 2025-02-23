import React from "react";
import { useState,useEffect } from "react";
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
            )
            setSales(res.data)
            console.log(sales)
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        getData();
    }, [month]);

    const handelMonth = (e) => {
        setMonth(e.target.value)
    }

    return( 
    <div>
        <div>
            <h1>Select Month</h1>
            <select value={month} onChange={handelMonth}>
                <option value={""} disabled>Select Month</option> 
                {
                    months.map((mon, key) => (
                        <option key={key} value={mon}>{mon}</option> 
                    ))
                }
            </select>
        </div>
        <div>
            <table>
                <tr>
                    <th>Month</th>
                    <td>{sales.Month}</td>
                </tr>
                <tr>
                    <th>Total Sold Items</th>
                    <td>${sales.totalSoldSales}</td>
                </tr>
                <tr>
                    <th>Total UnSold Items</th>
                    <td>${sales.totalUnSoldSales}</td>
                </tr>
            </table>
        </div>
    </div>
    );
}

export default TotalSales;
