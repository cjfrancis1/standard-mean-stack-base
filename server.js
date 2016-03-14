"use strict";

const express = require('express'),
    path = require('path'),
    config = require('./config/config.js'),
    mongoose = require('mongoose').connect(config.env.dbURL),
    bodyParser = require('body-parser');

const app = express();
const router = require(config.app.srcDir + 'api');

app.set('port', process.env.PORT || 5000);
app.set('host', config.env.host);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', router);

const server = require('http').createServer(app);

server.listen(app.get('port'), function(){
    console.log(`The server is running on port: ${app.get('port')}`);
    console.log(`host: ${app.get('host')}`);
});