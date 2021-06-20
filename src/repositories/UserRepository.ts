// import { UserModel } from '../models/User';
// import mongoose, { Document } from 'mongoose';
// import { ContainerInstance } from 'typedi';

// import LoggerService from '../services/LoggerService';
// import { User } from '../types/Type';

// class UserRepository {
//   loggerService: LoggerService;
//   User: mongoose.Model<Document>;
//   constructor(container: ContainerInstance) {
//     this.loggerService = container.get(LoggerService);
//     this.User = container.get(UserModel).getModel();
//   }

//   async createUser(user: {
//     signinProviderUserId: string;
//     signinProvider: string;
//     name: string;
//     email: string;
//   }) {
//     try {
//       const response = await this.User.create(user);
//       return (response as unknown) as User;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async findUserBySigninProviderUserId(
//     signinProviderUserId: string,
//     signinProvider: string
//   ) {
//     try {
//       const response = (await this.User.findOne({
//         signinProviderUserId,
//         signinProvider
//       }).lean()) as unknown;
//       return response as User;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// export default UserRepository;