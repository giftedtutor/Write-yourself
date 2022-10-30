import express from "express";
import {
  login,
  register,
  forgotPassword,
  addUpdatePass,
} from "../controllers/userController.js";
const router = express.Router();

// user table routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgotPass", forgotPassword);
router.post("/addUpdatePass/:id/:token", addUpdatePass);

export default router;
