// Step by step
// 1. Connect DB
console.log('Admin entered: ' + process.argv[2]);
// Import functions
import { DateTime } from 'luxon';
import mongoose from 'mongoose';
import generator from 'generate-password';
import { hashPassword } from './helpers/passwordHash';
require('dotenv').config();

mongoose.connect('mongodb://localhost/yelp_camp', {
  //process.env.MONGO_URL
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() =>{
  console.log("connected")
});
//
const Schema = mongoose.Schema;
const roleSchema = new Schema({
  roleName: {
    type: String,
    required: true
  }
});
const Role = mongoose.model('Role', roleSchema);
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    passwordHashed: {
      type: String,
      required: true
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }
  },
  {
    // DateTime.fromISO("2016-05-25");
    // Parsing ex
    timestamps: { currentTime: () => (DateTime.now() as any) as number }
  }
);
const User = mongoose.model('User', userSchema);
// You can invoke Lambda functions directly with the Lambda console
// 2. Generate default password
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
// 4. Generate link to reset password UI localhoist:7000/password/reset/token
