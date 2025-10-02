import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import { generateToken } from '../config/utils.js';

export const signup = async (req, res) => {
  const { userName, email, password } = req.body;
  const cleanerUserName = typeof userName === 'string' ? userName.trim() : '';
  const cleanerEmail = typeof email === 'string' ? email.trim().toLocaleLowerCase() : '';
  const pass = typeof password === 'string' ? password : '';

  try {
    if (!cleanerUserName || !cleanerEmail || !pass) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (pass.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanerEmail)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const user = await User.findOne({
      $or: [{ cleanerEmail }, { cleanerUserName }],
    });

    if (user) {
      if (user.email === cleanerEmail) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      if (user.userName === cleanerUserName) {
        return res.status(400).json({ message: 'Username already exists' });
      }
    }

    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    const newUser = new User({
      email: cleanerEmail,
      userName: cleanerUserName,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });

      // TODO: send welcome email to user
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.log(`Error in signup controller ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};
