const express = require("express")
const authController = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const authRouter = express.Router();

authRouter.post("/register", authController.registerController)

authRouter.post("/login", authController.loginController)

authRouter.post("/logout", authController.logoutController)

authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController )

module.exports = { authRouter }