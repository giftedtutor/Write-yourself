import Record from "../models/recordModel.js";
import asyncHandler from "express-async-handler";
// post Record data

const addRecord = asyncHandler(async (req, res) => {
  const recordData = new Record({
    user_id: req.body.user_id,
    list: req.body.list,
  });
  try {
    const record = await recordData.save();
    res.status(200).json({ Message: "Record Added Successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get record data daily base

const getRecords = asyncHandler(async (req, res) => {
  try {
    const record = await Record.find({
      user_id: req.query.user_id,
    });
    res.status(200).json(record);
  } catch (err) {
    res.status(500).json(err);
  }
});

// (Submit) Update data of each record

const updateRecord = asyncHandler(async (req, res) => {
  const recordData = {
    _id: req.body._id,
    user_id: req.body.user_id,
    list: req.body.list,
  };
  try {
    const fData = await Record.findOneAndUpdate(
      { _id: req.body._id },
      recordData
    );
    res.status(200).json({ message: "Record Updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

export { addRecord, getRecords, updateRecord};
