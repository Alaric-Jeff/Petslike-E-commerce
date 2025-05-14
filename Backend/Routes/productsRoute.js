import CreateProductController from "../Controllers/Admin/ProductManagement/CreateProductController.js";
import DeleteProductController from  "../Controllers/Admin/ProductManagement/DeleteProductController.js";
import UpdateProductController from "../Controllers/Admin/ProductManagement/UpdateProductController.js";
import express from 'express'

const router = express.Router();

router
    .post('/create', CreateProductController)
    .put('/update', UpdateProductController)
    .delete('/delete', DeleteProductController)

export default router;