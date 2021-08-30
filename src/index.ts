import express from 'express';
import databaseConnect from './config/database';

require('dotenv').config();

const app = express();

databaseConnect();

app.listen(4001, () => {
  console.log(`server running on port 4001`);
});
