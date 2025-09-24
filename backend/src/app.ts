import express from 'express';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (_req, res) => {
    res.send('Hello World from Express + TypeScript!');
});

export default app;
