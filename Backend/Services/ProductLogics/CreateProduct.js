import ProductModel from '../../Models/ProductModel.js';
import logger from '../../Utils/logger.js';

async function CreateProduct(
  productName,
  productPrice,
  productStock,
  foodCategory,
  dietCategory,
  lifeStage,
  productDescription,
  productImage,
  productBrand,
  animalType
) {
  try {
    await ProductModel.create({
      productName,
      productPrice,
      productStock,
      foodCategory,
      dietCategory,
      lifeStage,
      productDescription,
      productImage,
      productBrand,
      animalType,
    });
  } catch (err) {
    logger.error("Error adding product in services, reason:", err);
    throw err;
  }
}

export default CreateProduct;
