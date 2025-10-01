import mongoose from 'mongoose';
import colors from 'colors';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(colors.green(`Database connected: ${conn.connection.host}`));
  } catch (error) {
    console.log(`MongoDb connection error ${error}`);
    process.exit(1);
  }
};
