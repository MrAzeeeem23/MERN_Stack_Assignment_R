import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function TransactionDashboard() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [expand, setExpand] = useState({});

    const getData = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3000/api/product?search=${search ? search : {}
                }&page=${page}&limit=10`
            );
            setData(res.data.product);
            setTotalPage(res.data.totalPage);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        getData();
    }, [page, search]);

    const toggle = (id) => {
        setExpand((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="p-4">
            <div className="my-2">
                <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 bg-blue-100 w-80 rounded-xl"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Sold</th>
                            <th className="px-4 py-2">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((product) => (
                            <tr key={product.id} className="border-b">
                                <td className="px-4 py-2">{product.id}</td>
                                <td className="px-4 py-2">{product.title}</td>
                                <td className="px-4 py-2 w-180">
                                    {product.description.slice(
                                        0,
                                        expand[product.id] ? 1000 : 150
                                    )}{" "}
                                    <button
                                        className="text-blue-500 cursor-pointer"
                                        onClick={() => toggle(product.id)}
                                    >
                                        Show {expand[product.id] ? "Less" : "More"}
                                    </button>
                                </td>
                                <td className="px-4 py-2">{product.price}</td>
                                <td className="px-4 py-2">{product.category}</td>
                                <td className="px-4 py-2">
                                    {product.sold ? "sold" : "unsold"}
                                </td>
                                <td className="px-4 py-2">
                                    <img className="w-20 h-auto" src={product.image} alt="img" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-center">
                {page - 1 < 1 ? (
                    ""
                ) : (
                    <button
                        className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
                        onClick={() => setPage(page - 1)}
                    >
                        Prev
                    </button>
                )}
                <span className="text-xl text-center p-2 w-10">
                    {page}/{totalPage}
                </span>
                {page > totalPage - 1 ? (
                    ""
                ) : (
                    <button
                        className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}

export default TransactionDashboard;
