import express from 'express';
import {
  getAllContacts,
  getMessagesByUserId,
  sendMessage,
  getChats,
} from '../controllers/message.controller.js';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();
router.use(arcjetProtection, protectRoute);

router.get('/contacts', getAllContacts);
router.get('/chats', getChats);
router.get('/:id', getMessagesByUserId);
router.post('/send/:id', sendMessage);

export default router;
