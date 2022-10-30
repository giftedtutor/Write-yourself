import mongoose from "mongoose";

const recordModel = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    list: [{
      activity: { type: String, default: '' },
    }],
  },
  { timestamps: true }
);

const Record = mongoose.model("record", recordModel);
export default Record;
