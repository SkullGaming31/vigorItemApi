import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import api from './api';
import twitchRouter from './auth';
import MessageResponse from './interfaces/MessageResponse';
import * as middlewares from './middlewares';

import { config } from 'dotenv';
config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    greeting: 'Welcome ',
    message: 'You can use the following endpoints:',
    endpoints: [
      { label: 'Vigor API', endpoint: '/api/v1/' },
      { label: 'Chatbot', endpoint: '/auth/twitch' },
    ],
  });
});

app.use('/auth/twitch', twitchRouter);
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
