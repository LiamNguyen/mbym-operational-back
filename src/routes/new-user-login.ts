import express from 'express';
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import {comparePasswords} from '../helpers/passwordHash'
const router = express.Router();

router.route('/new-user/').get((req, res) => {
  res.status(200).send('ALoha');
  console.log('dfasdf')
});
router.route('/new-user/').post((req, res) => {
    res.status(200).send('ALoha');
    console.log('dfasdf')
  });
export default router;
//User sign in route


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({ message: "invalid form submission" });
    }
    // Get user with email from DB
    // const user = await getUserByEmail(email);
  
    //Hash password and compare with in DB
    // const passFromDB = user && user._id ? user.password : null;
    // if (!passFromDB) {
    //   return res.json({ status: "Invalid email or password" });
    // } else {
    //   const result = await comparePasswords(password, passFromDB);
    //   console.log(result);
    //   if (!result) {
    //     return res.json({ status: "Invalid email or password" });
    //   } else {
       
    //     console.log(user);
    //     return res.json({
    //       message: "Log in successfully",
         
    //     });
    //   }
    // }
  });