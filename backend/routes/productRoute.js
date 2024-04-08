const express = require("express");
const { route } = require("../app");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetaile } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
    .route("/products").get(getAllProducts);
router
    .route("/products/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router
    .route("/products/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
    .get(getProductDetaile);



module.exports = router