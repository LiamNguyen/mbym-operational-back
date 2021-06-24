import mongoose, { Schema } from 'mongoose';
import { DateTime } from 'luxon';
import { Service } from 'typedi';

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  expireAt: {
    type: Date,
    require: true,
    default: Date.now() + 1000 * 60 * 60
  }
});
const Role = mongoose.model('Token', tokenSchema);

export const model = mongoose.model('Token', tokenSchema);
export const mockModel = mongoose.model('mockToken', tokenSchema);

// export const RoleModel = Service(() => ({
//   getModel() {
//     return model;
//   }
// }));

export default model;
