const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const cors = require('cors');

const indexRoute = require('./routes/indexRoute');
const path = require('path');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });
  

app.use('/', indexRoute);

module.exports = server;