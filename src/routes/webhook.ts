import express from 'express';
import { verifyWebhook, handleMessage } from '../controllers/whatsapp';

const router = express.Router();

// GET para verificación del webhook
router.get('/', verifyWebhook);

// POST para recibir mensajes
router.post('/', handleMessage);

export default router;
