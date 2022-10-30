import express from "express";
import {
  addRecord,
  getRecords,
  updateRecord,
} from "../controllers/recordController.js";
const router = express.Router();

// record table routes

router.post("/addRecord", addRecord);
router.get("/getRecords", getRecords);
router.put("/updateRecord", updateRecord);

export default router;
