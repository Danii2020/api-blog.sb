"use strict";
exports.__esModule = true;
exports.config = void 0;
require('dotenv').config();
var config = {
    env: process.env.NODE_ENV || 'dev',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 3000,
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    adminTestToken: process.env.ADMIN_TEST_TOKEN,
    userTestToken: process.env.USER_TEST_TOKEN
};
exports.config = config;
