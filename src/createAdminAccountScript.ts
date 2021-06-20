// Step by step
// 1. Connect DB
console.log('Admin entered: ' + process.argv[2]);
// Import functions
import { DateTime } from 'luxon';
import mongoose from 'mongoose';
import generator from 'generate-password';
import { hashPassword } from './helpers/passwordHash';
require('dotenv').config();
import nodemailer from 'nodemailer';
import User from './models/User'
import connectDatabase from './database';
connectDatabase();
//
// const Schema = mongoose.Schema;
// const roleSchema = new Schema({
//   roleName: {
//     type: String,
//     required: true
//   }
// });
// const Role = mongoose.model('Role', roleSchema);
// const userSchema = new Schema(
//   {
//     email: {
//       type: String,
//       required: true
//     },
//     passwordHashed: {
//       type: String,
//       required: true
//     },
//     roleId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Role'
//     }
//   },
//   {
//     // DateTime.fromISO("2016-05-25");
//     // Parsing ex
//     timestamps: { currentTime: () => (DateTime.now() as any) as number }
//   }
// );
// const getUserByEmail = email => {
//   return new Promise((resolve, reject) => {
//     if (!email) return false;
//     try {
//       userSchema.findOne({ email }, (error, data) => {
//         if (error) {
//           console.log(error);
//           reject(error);
//         }
//         resolve(data);
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// const User = mongoose.model('User', userSchema);
// // You can invoke Lambda functions directly with the Lambda console
// // 2. Generate default password
const email = process.argv[2];
const defaultPassword = generator.generate({
  length: 10,
  numbers: true
});
// 3. Insert User to DB
console.log(email + ' ' + defaultPassword);
// .then(hashed => {
// console.log(defaultPassword, hashed)
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
// })
// .catch(err => {
//   console.log(err);
// });

//  Send password to user's email
// 4. Generate link to reset password UI localhost:7000/password/reset/token
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thang15091996@gmail.com',
    pass: process.env.MY_EMAIL_PASS
  }
});

const mailOptions = {
  from: 'thang15091996@gmail.com', //Change soon
  to: 'viktor.thang.phan@gmail.com', //Change
  subject: 'Reset for new Password',
  html: `<p>The random password is ${defaultPassword}</p><p>Click <a href="http://localhost:3000/">here</a> to reset your password</p>`
  //Sign in UI
};
transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log('sent');
  }
});
