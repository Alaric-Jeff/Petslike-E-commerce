import CreateProductController from "../../Controllers/ProductController/CreateProductController.js";
import DeleteProductController from "../../Controllers/ProductController/DeleteProductController.js";
import UpdateProductController from "../../Controllers/ProductController/UpdateProductController.js";
import GetAllProductsController from "../../Controllers/ProductController/GetAllProducts.js";
import GetSortedProduct from "../../Controllers/ProductController/GetSortedProducts.js";

import express from 'express'

const router = express.Router();

router
    .post('/create', CreateProductController)
        .post('/sorted', GetSortedProduct)
    .put('/update/:productId', UpdateProductController)
    .delete('/delete/:productId', DeleteProductController)
    .get('/getAll', GetAllProductsController)

export default router;