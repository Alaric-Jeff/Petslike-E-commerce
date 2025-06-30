import searchProducts from "../../Services/ProductServices/SearchProduct.js";
import logger from "../../Utils/logger.js";

const SearchProductController = async (req, res)=> {

    const{keyword} = req.body;

    if(!keyword){
        logger.info("Invalid value, recieved: ", keyword)
        return res.status(400).json({
            success: false,
            message: "Invalid keyword"
        })
    }

    try{

        const products = await searchProducts(keyword);

        if(products.length === 0){
            logger.info("Successfully retrieved, but no results")
            return res.status(401).json({
                success: true,
                message: `No product found with keyword: ${keyword}`
            })
        }

        logger.info("Successfully retrieved products in controller")

        return res.status(200).json({
            message: "Successfully retrieved products",
            success: true,
            data: products
        })

    }catch(error){
        logger.error("Error occure in search product controller, reason: ", error)
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
};

export default SearchProductController;