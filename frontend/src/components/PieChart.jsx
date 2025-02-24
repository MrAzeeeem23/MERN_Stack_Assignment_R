import React from "react";
import { useState, useEffect } from "react";
import { Chart as ChartJs } from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
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

function PieChart() {
    const [data, setData] = useState([]);
    const [month, setMonth] = useState();

    const handelMonth = (e) => {
        setMonth(e.target.value);
    };

    const arr = [];

    const getData = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3000/api/product/getPieChart?month=${month}`
            );
            setData(res.data);
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        getData();
    }, [month]);

    data.map((e) => arr.push(e._id))

    return (
        <div className="max-w-full bg-blue-50 flex flex-col justify-center items-center">
            <div className="flex p-2">
                <h1 className="font-serif py-2 pr-2">Select Month</h1>
                <select value={month} onChange={handelMonth} className="bg-blue-100 p-1 rounded stroke-0 outline-0 cursor-pointer">
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
            <div className="w-100">
                <Pie
                    data={{
                        labels: data.map((d) => d._id),
                        datasets: [
                            {
                                lable: "Price",
                                data: data.map((data) => data.totalsale),
                                backgroundColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 205, 86)',
                                    'rgb(233, 221, 32)',
                                ]

                            },
                        ]
                    }}
                />
            </div>
        </div>
    );
}

export default PieChart;
