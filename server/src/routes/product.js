const productController = require("../controllers/ProductController");
const middlewareController = require("../controllers/middlewareController")
const productControllerAdmin = require("../controllers/Admin/productController")
const router = require("express").Router();

// GET ALL PRODUCTS
router.get("/",middlewareController.verifyToken, productController.getAllProducts);

// GET SIMILAR PRODUCTS
router.get("/similar/:id",middlewareController.verifyToken, productController.getSimilarProducts);

// GET PRODUCT BY ID
router.get("/:id",middlewareController.verifyToken, productController.getProductById);


// ADD PRODUCT
router.post("/add",middlewareController.verifyTokenAndAdminAuth, productControllerAdmin.addProduct);

// UPDATE PRODUCT BY ID
router.post("/update/:id",middlewareController.verifyTokenAndAdminAuth, productControllerAdmin.updateProduct);

// DELETE PRODUCT BY ID
router.get("/delete/:id",middlewareController.verifyTokenAndAdminAuth, productControllerAdmin.deleteProduct);


module.exports = router;