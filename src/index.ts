import express from 'express';

const app = express();
app.listen(4001, () => {
  console.log(`server running on port 4001`);
});
