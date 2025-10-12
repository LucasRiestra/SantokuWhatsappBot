import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import webhookRoutes from './routes/webhook';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB
connectDB();

// Rutas
app.get('/', (req: Request, res: Response) => {
  res.send('Santoku WhatsApp Bot - Server is running');
});

app.use('/webhook', webhookRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
