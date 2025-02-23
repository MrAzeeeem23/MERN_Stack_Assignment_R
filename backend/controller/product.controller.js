import Product from "../model/productModel.js";
import axios from "axios";

const addProductData = async (req, res) => {
    try {
        const { data } = await axios.get(
            "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
        );

        const dataExist = await Product.countDocuments();

        if (dataExist > 0) {
            console.log("error");
        }

        await Product.insertMany(data);

        res.json({ message: "data is added in to the database" });
    } catch (error) {
        console.log(error);
    }
};

const getProduct = async (req, res) => {
    try {
        let { search, month, page = 1, limit = 10 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        let query = {};

        search ? query.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
        ] : {}


        const product = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(limit);
        const total = await Product.countDocuments(query);

        res.json({
            product,
            totalPage: Math.ceil(total / limit),
            currentPage: page,
        });
    } catch (error) {
        console.log(error);
    }
};

const totalSales = async (req, res) => {
    try {
        const { month } = req.query;

        // let month = "June"

        const totalSoldSales = await Product.aggregate([
            {
                $addFields: {
                    monthName: { $dateToString: { format: "%B", date: { $toDate: "$dateOfSale" } } }
                }
            },
            {
                $match: {
                    monthName: month,
                    sold: true,
                },
            },
            {
                $group: {
                    _id: '$Month',
                    totalSoldSales: {
                        $sum: "$price",
                    },
                },
            },
        ]);

        const totalUnSoldSales = await Product.aggregate([
            {
                $addFields: {
                    monthName: { $dateToString: { format: "%B", date: { $toDate: "$dateOfSale" } } }
                }
            },
            {
                $match: {
                    monthName: month,
                    sold: false,
                },
            },
            {
                $group: {
                    _id: null,
                    totalUnSoldSales: {
                        $sum: "$price",
                    },
                },
            },
        ]);

        const soldSalesValue =
            totalSoldSales.length > 0 ? totalSoldSales[0].totalSoldSales : 0;
        const unSoldSalesValue =
            totalUnSoldSales.length > 0 ? totalUnSoldSales[0].totalUnSoldSales : 0;

        res.json({
            Month: month,
            totalSoldSales: soldSalesValue,
            totalUnSoldSales: unSoldSalesValue,
        });
    } catch (error) {
        console.log(error);
    }
};


const getPieChart = async (req, res) => {
    try {
        let { month } = req.query;

        const regex = new RegExp(`-${month}-`, "i");

        const getCategory = await Product.aggregate([
            {
                $addFields: {
                    monthName: { $dateToString: { format: "%B", date: { $toDate: "$dateOfSale" } } }
                }
            },
            {
                $match: {
                    monthName: month,
                },
            },
            {
                $group: {
                    _id: "$category",
                    totalsale: { $sum: "$price" },
                    totalProductSold: { $sum: 1 },
                },
            },
        ]);

        res.json(getCategory);
    } catch (error) {
        res.json({ message: error.message });
    }
};

const getGraph = async (req, res) => {
    try {
        const { month } = req.query;

        // let month = "05";

        const getGraphData = await Product.aggregate([
            {
                $addFields: {
                    monthName: { $dateToString: { format: "%B", date: { $toDate: "$dateOfSale" } } }
                }
            },
            {
                $match: {
                    monthName: month,
                },
            },
            {
                $bucket: {
                    groupBy: "$price",
                    boundaries: [0, 101, 201, 301, 401, 501, 601, 701, 801, 901, 99999],
                    default: "901-above",
                    output: {
                        count: { $sum: 1 },
                    },
                },
            },
        ]);

        res.json({
            getGraphData,
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export { addProductData, getProduct, totalSales, getPieChart, getGraph };
