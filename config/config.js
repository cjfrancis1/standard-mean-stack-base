"use strict";

const config = {
    env: require('./' + (process.env.NODE_ENV || 'development') + '.json'),
    app: require('./app_settings.json')
};

module.exports = config;