import app from './app';

const serverPort = process.env.PORT || 4001

app.listen(serverPort, () => {
  console.log(`server running on port 4001`);
});
