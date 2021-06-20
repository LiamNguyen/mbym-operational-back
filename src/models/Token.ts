import mongoose from 'mongoose';
import { DateTime } from 'luxon';
import { Service } from 'typedi';


const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true
  }
});
const Role = mongoose.model('Role', roleSchema);

export const model = mongoose.model('Role', roleSchema);
export const mockModel = mongoose.model('mockRole', roleSchema);

// export const RoleModel = Service(() => ({
//   getModel() {
//     return model;
//   }
// }));

export default model;