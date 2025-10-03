import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import { generateToken } from '../config/utils.js';
import { sendWelcomeEmail } from '../emails/emailsHandler.js';
import { ENV } from '../config/env.js';

export const signup = async (req, res) => {
  const { userName, email, password } = req.body;
  const cleanedUserName = typeof userName === 'string' ? userName.trim() : '';
  const cleanedEmail =
    typeof email === 'string' ? email.trim().toLocaleLowerCase() : '';
  const pass = typeof password === 'string' ? password : '';

  try {
    if (!cleanedUserName || !cleanedEmail || !pass) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (pass.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanedEmail)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const user = await User.findOne({
      $or: [{ email: cleanedEmail }, { userName: cleanedUserName }],
    });

    if (user) {
      if (user.email === cleanedEmail) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      if (user.userName === cleanedUserName) {
        return res.status(400).json({ message: 'Username already exists' });
      }
    }

    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    const newUser = new User({
      email: cleanedEmail,
      userName: cleanedUserName,
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
      try {
        await sendWelcomeEmail(newUser.email, newUser.userName, ENV.clientURL);
      } catch (error) {
        console.error('Failed to send welcome email!', error);
      }
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.log(`Error in signup controller ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');;

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials!' });

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(`Error in login controller: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = async (_, res) => {
  res.cookie('jwt', '', { maxAge: 0 });
  res.status(200).json({ message: 'Logged out successfully!' });
};
