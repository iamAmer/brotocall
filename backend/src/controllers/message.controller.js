import Message from '../models/Message.js';
import User from '../models/user.js';

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select('-password');

    res.status(200).send(filteredUsers);
  } catch (error) {
    console.log(`Error in getAllContacts: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

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
