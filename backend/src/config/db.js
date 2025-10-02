import mongoose from 'mongoose';
import colors from 'colors';
import { ENV } from './env.js';

export const connectDB = async () => {
  if (!ENV.MONGO_URI) {
    console.error(colors.red('MONGO_URI environment variable is not defined'));
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log(colors.green(`Database connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(colors.red(`MongoDb connection error ${error}`));
    process.exit(1);
  }
};
