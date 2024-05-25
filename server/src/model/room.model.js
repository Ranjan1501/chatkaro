import mongoose, { Schema } from "mongoose";

const RoomsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
});

const Room = mongoose.model("rooms", RoomsSchema);
export default Room;
