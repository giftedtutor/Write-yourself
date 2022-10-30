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
    res.status(200).json({Message: 'Record Added Successfully'});
  } catch (err) {
    res.status(500).json(err);
  }
});

export { addRecord };
