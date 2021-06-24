// Import functions

import generator from 'generate-password';
import nodemailer from 'nodemailer';

import User from './models/User';
import connectDatabase from './database';
import { hashPassword } from './helpers/passwordHash';
import { createJWT } from './helpers/jwtHelper';
import Token from './models/Token';
import { exit } from 'node:process';

require('dotenv').config();

const mailgun = require('mailgun-js')({
  apiKey: process.env.API_KEY,
  domain: process.env.DOMAIN
});
const getUserByEmail = async (email: string) => {
  await connectDatabase();
  const response = await User.findOne({ email });
  return response;
};
const getTokenByUserId = async (user_id: string) => {
  await connectDatabase();
  const response = await Token.findOne({ user_id });
  return response;
};
const deleteTokenByUserId = async (user_id: string) => {
  await connectDatabase();
  const response = await Token.findByIdAndDelete(user_id);
};

const createAdmin = async () => {
  console.log('Admin entered: ' + process.argv[2]);
  // Step by step
  // 1. Connect DB
  connectDatabase();

  const email = process.argv[2];

  //Check if email existed in DB
  const userCheck = await getUserByEmail(email);
  //If there is already this email
  if (userCheck) {
    console.log('User existed');
    const tokenFromUserCheck = await getTokenByUserId(userCheck._id);
    const tokenExpireCheck = new Date() > tokenFromUserCheck.expireAt;
    if (tokenExpireCheck) {
      console.log('This Token has expired', '\nGranting new Toke now');
      await deleteTokenByUserId(userCheck._id);
      const accessJWT = await createJWT(userCheck.email, `${userCheck._id}`);
      const resultJWT = await Token.create({
        token: accessJWT,
        user_id: userCheck._id
      });
      console.log('Token created\n', 'Retry sign in');
    } else {
      console.log('Token is still valid');
    }
    return;
  }
  //if there is nos such email, create one
  else {
    // // 2. Generate default password
    const defaultPassword = generator.generate({
      length: 10,
      numbers: true
    });

    // 3. Insert User to DB
    console.log(email + ' ' + defaultPassword);

    const userObj = {
      email: email,
      //Hash password
      passwordHashed: hashPassword(defaultPassword)
      //Hash here
    };
    //  Set email and password and new JWT to database
    const resultUser = User.create(userObj).then(async data => {
      console.log('User created');
      const accessJWT = await createJWT(data.email, `${data._id}`);
      const resultJWT = await Token.create({
        token: accessJWT,
        user_id: data._id
      });
      console.log('Token created');
    });
    //  Send password to user's email
    // 4. Generate link to reset password UI localhost:7000/password/reset/token
    //Research on token without requiring user to enter email
    const registrationLinkEmailData = {
      from: 'Excited User <viktor.thang.phan@gmail.com>',
      to: 'viktor.thang.phan@gmail.com',
      subject: 'Reset for new Password',
      html: `<p>Click <a href="http://localhost:3000/change-default-password/token=">here</a> to reset your password</p>`
    };
    const defaultPasswordEmailData = {
      from: 'Excited User <viktor.thang.phan@gmail.com>',
      to: 'viktor.thang.phan@gmail.com',
      subject: 'Reset for new Password',
      html: `<p>The default password of ${email} is ${defaultPassword}</p>`
    };
    // mailgun.messages().send(registrationLinkEmailData, function (error: any, body: any) {
    //   console.log(body, 'Registration Link');
    // });
    // mailgun.messages().send(defaultPasswordEmailData, function (error: any, body: any) {
    //   console.log(body, 'Default password info');
    // });
  }
};

createAdmin();
