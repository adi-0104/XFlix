const httpStatus = require("http-status");

const errorHandler = (err, req, res, next) => {
    // Ensure statusCode has a valid value
    const statusCode = err.statusCode || 500;  // Force a default status code
    const message = err.message || "Internal Server Error";
    
    res.locals.errorMessage = message;
    
    const response = {
        code: statusCode,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack})
    }

    if(process.env.NODE_ENV === "development"){
        console.log(err);
    };

    // This should now never have an undefined status code
    res.status(statusCode).json(response);  // Changed from send() to json()
}

module.exports = {
    errorHandler
}