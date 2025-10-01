import mongoose from 'mongoose';
import colors from 'colors';

export const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.log(colors.red('MONGO_URI environment variable is not defined'));
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(colors.green(`Database connected: ${conn.connection.host}`));
  } catch (error) {
    console.log(colors.red(`MongoDb connection error ${error}`));
    process.exit(1);
  }
};
