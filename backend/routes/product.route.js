import express from 'express';
const router = express.Router()

import { addProductData, getProduct, totalSales, getPieChart, getGraph } from '../controller/product.controller.js'

router.route('/').get(getProduct);
router.route('/getMonthSales').get(totalSales)
router.route('/getPieChart').get(getPieChart)
router.route('/getGraph').get(getGraph)

export default router;