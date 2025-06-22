import express from 'express';
import logger from '../../Utils/logger.js';
import DeleteProduct from '../../Services/ProductServices/DeleteProduct.js';

const DeleteProductController = async (req, res)=> {
    const {productId} = req.params;

    if(!productId){
        logger.info("Product id is undefined in DeleteProductController");
        return res.status(400).json({
            message: "Product id is required",
            success: false
        });
    }

    try{
        await DeleteProduct(productId);
        logger.info("Product deleted successfully in DeleteProductController");
        return res.status(200).json({
            message: "Product deleted successfully",
            success: true
        });
    }catch(err){
        logger.error("Error deleting product in DeleteProductController, reason: ", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export default DeleteProductController;