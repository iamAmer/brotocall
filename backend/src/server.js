import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import authRoutes from "./routes/auth.route.js"
import messageRouters from "./routes/message.route.js"

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use('/api/auth', authRoutes)
app.use('api/message', messageRouters)

app.listen(PORT, () => {
  console.log(colors.yellow(`Server is running on port ${PORT}`));
});
