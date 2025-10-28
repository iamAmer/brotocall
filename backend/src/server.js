import express from 'express';
import colors from 'colors';
import path from 'path';
import cookieParser from 'cookie-parser';
import { ENV } from './config/env.js';
import { app, server } from './config/socket.js';
import cors from 'cors';

import authRoutes from './routes/auth.route.js';
import messageRouters from './routes/message.route.js';
import { connectDB } from './config/db.js';

const PORT = ENV.PORT || 3000;

const __dirname = path.resolve();

app.use(express.json({ limit: '5mb' })); // req.body
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRouters);

// make ready for deployment
if (ENV.NODE_ENV == 'production') {
  console.log(`dirname: ${__dirname}`);
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(colors.blue(`Server is running on port ${PORT}`));
    });
  } catch (error) {
    console.error(`Database connection Failed: ${error}`);
    process.exit(1);
  }
};

startServer();
