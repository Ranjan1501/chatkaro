import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: false,
  },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rooms",
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isGroupMessage: {
    type: Boolean,
    required: true,
  },
});

const Message = mongoose.model("Message", MessageSchema);
export default Message;
