import express, { query } from "express"
import { addProductData, getProduct, totalSales } from "./controller/product.controller.js";
import connectDB from "./config/database.js";
import Product from "./model/productModel.js";
import productRoute from "./routes/product.route.js"
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = 3000;
connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed HTTP methods
}))

app.get("/", (req, res) => {
    addProductData()
    res.send("hello world")
})

app.use('/api/product', productRoute);


app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
})