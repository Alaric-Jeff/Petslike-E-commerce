import ProductModel from "../../../Models/ProductModel.js";
import logger from "../../../Utils/logger.js";

const GetSortedProduct = async (req, res) => {
  try {
    const {
      foodCategory,
      dietCategory,
      lifeStage,
      productBrand,
      animalType,
    } = req.body;

    if (!foodCategory && !dietCategory && !lifeStage && !productBrand && !animalType) {
      logger.info("All categories are undefined");
      return res.status(400).json({
        success: false,
        message: "All categories are undefined"
      });
    }

    const whereClause = {};

    if (foodCategory) whereClause.foodCategory = foodCategory;
    if (dietCategory) whereClause.dietCategory = dietCategory;
    if (lifeStage) whereClause.lifeStage = lifeStage;
    if (productBrand) whereClause.productBrand = productBrand;
    if (animalType) whereClause.animalType = animalType;

    const products = await ProductModel.findAll({ where: whereClause });

    res.status(200).json({
      success: true,
      message: "Successfully retrieved sorted products",
      products
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message
    });
  }
};

export default GetSortedProduct;
