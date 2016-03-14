"use strict";

const mongoose = require('mongoose'),
    config = require('../config/config.js');

mongoose.connect(config.env.dbURL, function(err) {
    if (err) {
        console.log('err');
    } else {
        console.log('Successfully connected to MongoDB!');
    }
});