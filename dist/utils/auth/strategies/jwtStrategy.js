"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("../../../config/config");
const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: config_1.config.jwtSecret
};
const JwtStrategy = new passport_jwt_1.Strategy(options, (payload, done) => {
    return done(null, payload);
});
exports.JwtStrategy = JwtStrategy;
function cookieExtractor(req) {
    let token = null;
    if (req && req.cookies)
        token = req.cookies['jwt'];
    return token;
}
