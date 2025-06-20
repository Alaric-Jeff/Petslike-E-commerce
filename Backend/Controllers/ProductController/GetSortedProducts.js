import GetSortedProducts from "../Services/ProductService.js";

export const GetSortedProductsController = async (req, res) => {
    
    const categories = req.body.categories;

    if (!categories || typeof categories !== 'object') {
        return res.status(400).json({
            message: "Invalid or missing categories",
            success: false
        });
    }

    try {
        const products = await GetSortedProducts(categories);
        return res.status(200).json({
            message: "Products sorted successfully",
            success: true,
            data: products
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
