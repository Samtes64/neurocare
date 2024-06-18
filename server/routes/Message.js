import express from 'express';
import { getMessages } from '../controllers/Chat.js';

const router = express.Router();

router.get('/:from/:to', getMessages);

export default router;
