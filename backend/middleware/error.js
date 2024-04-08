const { TokenExpiredError } = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";



    //wrong mongoDB id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }


    //Mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${object.key(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400)
    }

    //wrong JWT error
    if (err.name === "jsonWebTokenError") {
        const message = `JSON web token is invalid, try again`;
        err = new ErrorHandler(message, 400)
    }

    //JWT expire error
    if (err.name === "TokenExpiredError") {
        const message = `JSON web token has expired, try again`;
        err = new ErrorHandler(message, 400)
    }




    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}