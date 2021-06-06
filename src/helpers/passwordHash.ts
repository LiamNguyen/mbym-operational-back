import bcrypt from 'bcrypt';

// export const hashThisPlease =  (password: string) => {
//   const salt =  bcrypt.genSaltSync(
//     parseInt(process.env.SALT_ROUNDS as string)
//   );
//   console.log(salt, "Salttt")
//   const res =  bcrypt.hashSync('dfhasdjfsdjhfsdnjkafha', salt);
//   console.log(res + 'This is from passhelper');
//   return res;
// };

const saltRounds = 3;
export const hashPassword = (plainPassword: string) => {
  return bcrypt.hashSync(plainPassword, saltRounds);
};
export const comparePasswords = (pass: string, dbPass: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pass, dbPass, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};
