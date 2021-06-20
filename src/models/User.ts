import mongoose from 'mongoose';
import { DateTime } from 'luxon';
import { Service } from 'typedi';


const userSchema = new mongoose.Schema(
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


export const model = mongoose.model('User', userSchema);
export const mockModel = mongoose.model('mockUser', userSchema);

// export const RoleModel = Service(() => ({
//   getModel() {
//     return model;
//   }
// }));

export default model;