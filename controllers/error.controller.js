const { AppError } = require('../utils/appError.util');

const sendErrorDev = (err, req, res) =>{
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: 'fail',
        message: err.message,
        error: err,
        stack: err.stack
    });
};

const sendErrorProd = (err, req, res) =>{
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: 'fail',
        message: err.message || 'something went wrong'
    });
};

const globalErrorHandler = ( err, req, res, next ) => {

    if( process.env.NODE_ENV === 'development' ) {
        sendErrorDev(err, req, res);
    }else if( process.env.NODE_ENV === 'production' ) {
        let error = {...err};

        error.message = err.message;

        if(err.name === 'SequelizeUniqueConstraintError'){
            error = handleUniqueEmailError();
        };

        if(err.name === 'TokenExpiredError'){
            error = handleJWTExpiredError();
        };

        sendErrorProd(error, req, res);
    };
};

module.exports = { globalErrorHandler };