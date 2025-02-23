import mongoose from 'mongoose'

const productSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        title: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        description: {
            type: String
        },
        category: {
            type: String
        },
        image: {
            type: String
        },
        sold: {
            type: Boolean
        },
        dateOfSale: {
            type: String
        }
    }
)

const Product = mongoose.model("Product", productSchema);
export default Product;