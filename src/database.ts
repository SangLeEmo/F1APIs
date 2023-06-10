import { ConnectOptions, connect } from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) process.exit(1); // Exit when MongoDB URI doesn't config
    const options: ConnectOptions = {};
    if (process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD) {
      options.authSource = 'admin';
      options.user = process.env.MONGO_USERNAME;
      options.pass = process.env.MONGO_PASSWORD;
    }
    await connect(mongoURI);
    console.log(`MongoDB Connected: ${mongoURI}`);
  } catch (error) {
    console.log(error);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;