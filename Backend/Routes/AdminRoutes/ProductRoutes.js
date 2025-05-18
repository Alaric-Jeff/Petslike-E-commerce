import CreateProductController from "../../Controllers/Admin/ProductManagement/CreateProductController.js";
import DeleteProductController from  "../../Controllers/Admin/ProductManagement/DeleteProductController.js";
import UpdateProductController from "../../Controllers/Admin/ProductManagement/UpdateProductController.js";
import GetAllProductsController from "../../Controllers/Admin/ProductManagement/GetAllProducts.js";
import GetSortedProduct from "../../Controllers/Admin/ProductManagement/GetSortedProduct.js";
import express from 'express'

const router = express.Router();

router
    .post('/create', CreateProductController)
        .post('/sorted', GetSortedProduct)
    .put('/update/:productId', UpdateProductController)
    .delete('/delete/:productId', DeleteProductController)
    .get('/getAll', GetAllProductsController)

export default router;