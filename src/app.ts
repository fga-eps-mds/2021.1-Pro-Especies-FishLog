import express from 'express';
import databaseConnect from './config/database';
import router from './routes/router';

require('dotenv').config();

const app = express();
app.disable('x-powered-by');

databaseConnect();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

app.use(router);

export default app;
