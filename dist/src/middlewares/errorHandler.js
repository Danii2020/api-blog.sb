"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boomErrorHandler = exports.errorHandler = exports.logErrors = void 0;
const logErrors = (err, req, res, next) => {
    console.log(err);
    next(err);
};
exports.logErrors = logErrors;
const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    });
};
exports.errorHandler = errorHandler;
const boomErrorHandler = (err, req, res, next) => {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
};
exports.boomErrorHandler = boomErrorHandler;
