import { Op } from 'sequelize';
import ProductModel from '../../Models/ProductModel.js';
import logger from '../../Utils/logger.js';

async function searchProducts(keyword) {
  try {
    const products = await ProductModel.findAll({
      where: {
        productName: {
          [Op.like]: `%${keyword}%`
        }
      },
      attributes: ['productId', 'productName', 'productPrice', 'productImage']
    });

    logger.info('Successfully retrieved products in the search-product Service');
    return products;
  } catch (error) {
    console.error('Error searching products:', error);
    logger.error('Unsuccessful retrieving products in search-product Service');
    throw error;
  }
}

export default searchProducts;
