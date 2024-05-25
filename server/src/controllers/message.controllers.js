// import { model } from "mongoose";
import Message from "../model/message.model.js";
import Room from "../model/room.model.js";
import User from "../model/user.model.js";

export const getUserMessages = async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({
      $or: [{ sender_id: userId }, { receiver_id: userId }],
    });
    return res.status(200).json({ messages });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRoomMessages = async (req, res) => {
  const groupId = req.params.groupId;

  try {
    const messages = await Message.find({ room_id: groupId });
    return res.status(200).json({ messages });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createMessage = async (req, res) => {
  const { message, sender_id, receiver_id, room_id, isGroupMessage } = req.body;

  if (
    !message ||
    !sender_id ||
    (isGroupMessage && !room_id) ||
    (!isGroupMessage && !receiver_id)
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Validate sender_id
    const sender = await User.findById(sender_id);
    if (!sender) {
      return res.status(404).json({ error: "Sender not found" });
    }

    if (isGroupMessage) {
      // Validate room_id for group messages
      const room = await Room.findById(room_id);
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }
    } else {
      // Validate receiver_id for direct messages
      const receiver = await User.findById(receiver_id);
      if (!receiver) {
        return res.status(404).json({ error: "Receiver not found" });
      }
    }

    const newMessage = new Message({
      message,
      sender_id,
      receiver_id: isGroupMessage ? null : receiver_id,
      room_id: isGroupMessage ? room_id : null,
      isGroupMessage,
    });

    const savedMessage = await newMessage.save();
    return res.status(201).json({ message: savedMessage });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
