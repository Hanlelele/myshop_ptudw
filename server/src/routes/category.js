const categoryController = require("../controllers/CategoryController");

const middlewareController = require("../controllers/middlewareController")
const router = require("express").Router();

// GET ALL CATEGORIES
router.get("/",middlewareController.verifyToken, categoryController.getAllCategories);

module.exports = router;