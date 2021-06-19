// Step by step
// 1. Connect DB
console.log('Admin entered: ' + process.argv[2]);

// Import functions
import { DateTime } from 'luxon';
import mongoose from 'mongoose';
import generator from 'generate-password';


import nodemailer from 'nodemailer';
import User from './models/User';
import connectDatabase from './database';
import { hashPassword } from './helpers/passwordHash';
var domain = 'sandbox0af18f09df984338921f01bc31e73f76.mailgun.org';
require('dotenv').config();

const mailgun = require('mailgun-js')({
  apiKey: process.env.API_KEY,
  domain: process.env.DOMAIN
});

connectDatabase();

// // 2. Generate default password
const email = process.argv[2];
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

console.log(userObj);

//  Set email and password to database
const result = User.create(userObj).then(data => {
  console.log('created');
});

//  Send password to user's email
// 4. Generate link to reset password UI localhost:7000/password/reset/token
const registrationLinkEmailData = {
  from: 'Excited User <viktor.thang.phan@gmail.com>',
  to: 'viktor.thang.phan@gmail.com',
  subject: 'Reset for new Password',
  html: `<p>Click <a href="http://localhost:3000/">here</a> to reset your password</p>`
};
const defaultPasswordEmailData = {
  from: 'Excited User <viktor.thang.phan@gmail.com>',
  to: 'viktor.thang.phan@gmail.com',
  subject: 'Reset for new Password',
  html: `<p>The default password of ${email} is ${defaultPassword}</p>`
};
mailgun.messages().send(registrationLinkEmailData, function (error: any, body: any) {
  console.log(body, 'Registration Link');
});
mailgun.messages().send(defaultPasswordEmailData, function (error: any, body: any) {
  console.log(body, 'Default password info');
});
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'thang15091996@gmail.com',
//     pass: process.env.MY_EMAIL_PASS
//   }
// });

// const mailOptions = {
//   from: 'thang15091996@gmail.com', //Change soon
//   to: 'viktor.thang.phan@gmail.com', //Change
//   subject: 'Reset for new Password',
//   html: `<p>The random password is ${defaultPassword}</p><p>Click <a href="http://localhost:3000/">here</a> to reset your password</p>`
//   //Sign in UI
// };
// transporter.sendMail(mailOptions, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('sent');
//   }
// });
