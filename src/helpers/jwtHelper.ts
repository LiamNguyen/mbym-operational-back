import jwt from 'jsonwebtoken';
import { saveJWT } from './redisHelper';
require('dotenv').config();
export const createJWT = async (email: string, id: string) => {
  const accessJWT = jwt.sign(
    { email },
    process.env.JWT_ACCESS_SECRET as string,
  );
  await saveJWT(accessJWT, id);
  return Promise.resolve(accessJWT);
};
