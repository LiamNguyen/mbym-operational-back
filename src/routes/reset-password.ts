import express from 'express';

import { comparePasswords, hashPassword } from '../helpers/passwordHash';
import connect from '../database';
import User from '../models/User';
import Token from '../models/Token';

const router = express.Router();

//Repositories
const getUserByEmail = async (email: string) => {
  await connect();
  const response = await User.findOne({ email });
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

const getTokenByUserId = async (user_id: string) => {
  await connect();
  const response = await Token.findOne({ user_id });
  return response;
};

//Routes
router.route('/reset-password/').post(async (req, res) => {
  const { email, password, newPassword } = req.body;

  if (!email) {
    res.json({ message: 'invalid form submission' });
  }
  // Get user with email from DB
  const user = await getUserByEmail(email);
  console.log(user._id);

  const tokenFromHeader = req.headers.authorization;
  const tokenLoadFromUser = await getTokenByUserId(user._id);
  const tokenFromDB = tokenLoadFromUser.token;
  const tokenCheck = tokenFromDB === tokenFromHeader;

  if (!tokenCheck) {
    return res.json({ message: 'Invalid Token for this user' });
  }
  //Check time on Token

  const expiredTokenCheck = new Date() > tokenLoadFromUser.expireAt;
  if (expiredTokenCheck) {
    return res.json({ message: 'Token expired, please contact admin' });
  } 

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

// router.route('/reset-password-check/').post((req, res) => {
//   const token = req.headers.authorization
//   console.log(token);
//   res.status(200).send('Aloha');

// });
export default router;
