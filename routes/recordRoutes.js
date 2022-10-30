import express from "express";
import {
  addRecord,
} from "../controllers/recordController.js";
const router = express.Router();

// record table routes

router.post("/addRecord", addRecord);

export default router;
