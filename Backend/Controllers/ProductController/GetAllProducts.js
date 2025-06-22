import express from 'express';
import logger from '../../Utils/logger.js';
import GetAllProducts from '../../Services/ProductServices/GetAllProducts.js';

const GetAllProductsController = async (req, res) => {
    try {
        const products = await GetAllProducts();
        logger.info("Products fetched successfully in GetAllProductsController");
        return res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            data: products
        });
    } catch (err) {
        logger.error("Error fetching products in GetAllProductsController, reason: ", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export default GetAllProductsController;   