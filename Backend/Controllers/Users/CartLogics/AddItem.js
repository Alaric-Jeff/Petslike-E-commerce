import AddItem from '../../../Services/CartLogics/AddItem.js'
import ProductModel from '../../../Models/ProductModel.js';
import CartModel from '../../../Models/CartModel.js';
import logger from '../../../Utils/logger.js'

const AddItemController = async (req, res) => {
      const {cartId, productId, quantity} = req.body;

      if(!cartId || !productId || !quantity){
        logger.info("Incomplete fields");
        return res.status(400).json({
            success: false,
            message: "Incomplete fields"
        })
      }

    try{
         const product = await ProductModel.findByPk(productId);

         if(!product){
            logger.info("Product doesn't exist, error in Add item controller")
            return res.status(400).json({
                success: false,
                message: "Product doesn't exist"
            })
         }

         if(quantity > product.productStock || quantity <= 0){
            return res.status(400).json({
                success: false, 
                message: "Invalid quantity error"
            })
         }

         const cart = await CartModel.findByPk(cartId);
         
         if(!cart){
            logger.info("Cart doesn't exist")
            return res.status(400).json({
                success: false, 
                message: "Cart doesn't exist"
            })
         }
         
         const totalPrice =  product.productPrice * quantity;

         await AddItem(product.productId, cart.cartId, quantity, totalPrice);
         logger.info("Successfully added item")
         return res.status(200).json({
            success: true,
            message: "Successfully added item"
         })

    }catch(err){
        logger.error("Error occured in Adding item in controllers, error: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    };
};

export default AddItemController;