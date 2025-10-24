import mongoose from 'mongoose';
import cloudinary from '../config/cloudinary.js';
import Message from '../models/Message.js';
import User from '../models/user.js';

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select('-password');

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(`Error in getAllContacts: ${error}`);
    res.status(500).json({ message: 'Internal Server error' });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    if (!mongoose.isValidObjectId(userToChatId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log(`Error in getMessagesByUserId controller ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image) {
      return res.status(400).json({ message: 'Text or image is required.' });
    }
    if (senderId.equals(receiverId)) {
      return res
        .status(400)
        .json({ message: 'Cannot send messages to yourself.' });
    }
    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: 'Receiver not found.' });
    }

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // TODO: send message in real-time
    res.status(200).json(newMessage);
  } catch (error) {
    console.log(`Error in sendMessage: ${error}`);
    res.status(500).json({ message: 'Internal Server error' });
  }
};

export const getChats = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await User.find({
      _id: { $in: chatPartnerIds },
    }).select('-password');

    res.status(200).json(chatPartners);
  } catch (error) {
    console.log(`Error in getChats: ${error}`);
    res.status(500).json({ message: 'Internal Server error' });
  }
};
