const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const { getData } = require('./controller.js');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/BTCData', (req, res) => {
  getData(req, res, (data) => {
    res.send(data);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))