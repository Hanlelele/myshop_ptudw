const productController = require("../controllers/ProductController");
const middlewareController = require("../controllers/middlewareController")

const router = require("express").Router();

// GET ALL PRODUCTS
router.get("/",middlewareController.verifyToken, productController.getAllProducts);

// GET SIMILAR PRODUCTS
router.get("/similar/:id",middlewareController.verifyToken, productController.getSimilarProducts);

// GET PRODUCT BY ID
router.get("/:id",middlewareController.verifyToken, productController.getProductById);

module.exports = router;