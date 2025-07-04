// import AddCartController from "../../Controllers/Users/CartLogics/AddCart.js";
// import AddItemController from "../../Controllers/Users/CartLogics/AddItem.js";
// import DeleteCartController from "../../Controllers/Users/CartLogics/DeleteCart.js";
// import DeleteItemController from "../../Controllers/Users/CartLogics/DeleteItem.js";
// import GetCartsController from "../../Controllers/Users/CartLogics/GetCarts.js";
// import GetItemsController from "../../Controllers/Users/CartLogics/GetItems.js";

import AddCartController from '../../Controllers/CartController/AddCartController.js';
import AddItemController from '../../Controllers/CartController/AddItemController.js';
import DeleteCartController from '../../Controllers/CartController/DeleteCartController.js';
import DeleteItemController from '../../Controllers/CartController/DeleteItemController.js';
import GetCartsController from '../../Controllers/CartController/GetCartsController.js';
import GetItemsController from '../../Controllers/CartController/GetAllItemsController.js';

import express from "express";
const router = express.Router();

router
    .post("/add-cart", AddCartController)
    .post("/add-item", AddItemController)
    .delete("/delete-cart", DeleteCartController)
    .delete("/delete-item", DeleteItemController)
    .get("/get-carts/:userId", GetCartsController)
    .get("/get-item/:userId", GetItemsController);

export default router;