import express from 'express';
import mongoose from 'mongoose';

import { comparePasswords, hashPassword } from '../helpers/passwordHash';
import connect from '../database';
import User from '../models/User';

const router = express.Router();

//Repositories
const getUserByEmail = async (email: string) => {
  await connect();
  const response = await User.findOne({ email });
  console.log(response);
  return response;
};

const updateDefaultPassword = async (
  email: string,
  newpasswordHashed: string
) => {
  await connect();
  const update = await User.findOneAndUpdate(
    { email },
    { $set: { passwordHashed: newpasswordHashed } },
    { new: true }
  );
  console.log('Password Updated');
};

//Routes
router.route('/reset-password/').post(async (req, res) => {
  const { email, password, newPassword } = req.body;
  if (!email) {
    res.json({ message: 'invalid form submission' });
  }
  // Get user with email from DB
  const user = await getUserByEmail(email);
  console.log(user);
  // res.status(200).send('Found user');
  //Hash password and compare with in DB
  const passFromDB = user && user._id ? user.passwordHashed : null;
  if (!passFromDB) {
    console.log(passFromDB, '/n', password);
    return res.json({ status: 'Invalid email or password' });
  } else {
    const result = await comparePasswords(password, passFromDB);
    console.log('This is the compare result: ', result);
    if (!result) {
      console.log('wrong password');
      return res.json({ status: 'Invalid email or password' });
    } else {
      console.log('Login in successfully');
      //Change default password
      const newpasswordHashed = await hashPassword(newPassword);
      const response = await updateDefaultPassword(email, newpasswordHashed);
      console.log(newpasswordHashed);
      res.json('Thank you');
    }
  }
});
router.route('/reset-password/').get((req, res) => {
  res.status(200).send('ALoha');
  console.log('dfasdf');
});
export default router;
//User sign in route
//0zsjY29oAo
