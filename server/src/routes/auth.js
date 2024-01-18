const router = require("express").Router();

const authController = require("../controllers/authController");
const middlewareController  = require("../controllers/middlewareController");

//REGISTER
router.post("/register", authController.registerUser);

//LOG IN
router.post("/login", authController.loginUser);

//LOG OUT
router.post("/logout", middlewareController.verifyToken, authController.logOut);

//UPDATE
router.post("/update/:id", middlewareController.verifyToken, authController.updateUser);

module.exports = router;