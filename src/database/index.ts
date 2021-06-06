import mongoose from 'mongoose';

const connect = async () => {
//   const dbConnectionString = process.env.DB_CONNECTION_STRING as string;

  await mongoose
    .connect('mongodb://localhost/yelp_camp', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Database connected!!', 'local Database');
    })
    .catch(error => {
      // TODO: Log to database
      console.log('Failed to connect to database', error);
    });
};

export default connect;