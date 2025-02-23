import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config()

const connectDB = async () => {
    try {
        // await mongoose.connect("mongodb://127.0.0.1:27017/R_product");
        await mongoose.connect(process.env.MONGODB_CONNECTION_URI);
        console.log("Database is connected Successfully")
    } catch (error) {
        console.log("Faild to connect to Database" + error)
    }
}

export default connectDB;