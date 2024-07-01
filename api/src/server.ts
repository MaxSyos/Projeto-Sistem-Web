import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv';
import './shared/container';
import express, { Router, NextFunction, Request, Response } from 'express';
import { AppError } from './errors/AppError';
import { routes } from './routes/index.routes';
import cors from 'cors';
import { corsConfig } from './configs';

const PORT = Number(process.env.BACKEND_PORT) || 4000;

const app = express();

app.use(express.json());
app.use(routes);
app.use((request: Request, response: Response, next: NextFunction) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your client's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
};
app.use(cors(corsOptions));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
