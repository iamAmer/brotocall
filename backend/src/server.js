import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import path from 'path';

import authRoutes from './routes/auth.route.js';
import messageRouters from './routes/message.route.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
const __dirname = path.resolve();

app.use('/api/auth', authRoutes);
app.use('api/message', messageRouters);

// make ready for deployment
if (process.env.NODE_ENV == 'production') {
  console.log(`dirname: ${__dirname}`);
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(colors.yellow(`Server is running on port ${PORT}`));
});
