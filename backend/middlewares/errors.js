const errorHandler = (err,req,res,next) => {
    let {statusCode, message} = err
    res.locals.errorMessage = err.message;
    let environment = process.env.NODE_ENV;
    const response = {
        code: statusCode,
        message,
        ...(environment === "development" && { stack: err.stack})
    }

    if(environment === "development"){
        console.log(err);
    };

    res.status(statusCode).send(response)
}

module.exports = {
    errorHandler
}