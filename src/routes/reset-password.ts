import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { comparePasswords } from '../helpers/passwordHash';
import connect from '../database';
import User from '../models/User';
const router = express.Router();
const getUserByEmail = async (email: string) => {
  await connect();
  const response = await User.findOne({ email });
  console.log(response)
  return response;
};

router.route('/reset-password/').post(async (req, res) => {
  const { email, password, newPassword } = req.body;
  if (!email) {
    res.json({ message: "invalid form submission" });
  }
  // Get user with email from DB
  const user = await getUserByEmail(email);
  console.log(user)
  res.status(200).send('Found user');
  //Hash password and compare with in DB
  const passFromDB = user && user._id ? user.password : null;
  if (!passFromDB) {
    return res.json({ status: "Invalid email or password" });
  } else {
    const result = await comparePasswords(password, passFromDB);
    console.log(result);
    if (!result) {
      return res.json({ status: "Invalid email or password" });
    } else {

      console.log(user);
      return res.json({
        // message: "Log in successfully",

      });
    }
  }
});
router.route('/reset-password/').get((req, res) => {
  res.status(200).send('ALoha');
  console.log('dfasdf');
});
export default router;
//User sign in route
