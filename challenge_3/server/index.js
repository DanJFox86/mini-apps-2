const express = require('express');
const path = require('path');
const app = express();

const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log(`Recieved a ${req.method} request from ${req.url}.`);
  res.send('received message');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
})