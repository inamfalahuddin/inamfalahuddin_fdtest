import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import bookRoutes from './routes/books.routes.js';
import path from 'path';
import { setupSwagger } from './middlewares/swagger.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/book', bookRoutes);

app.get('/', (_req, res) => {
    res.send('Hello World from Express + TypeScript!');
});

export default app;
