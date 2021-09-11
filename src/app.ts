import express from 'express';
import databaseConnect from './config/database';
import router from './routes/router';

require('dotenv').config();

const app = express();

databaseConnect();

app.use(express.json());

app.use(router);

export default app;
