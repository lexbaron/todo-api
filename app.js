const express = require('express');

const { AppError } = require('./utils/appError.util');
const { globalErrorHandler } = require('./controllers/error.controller');

const { usersRouter } = require('./routers/users.routes');
const { tasksRouter } = require('./routers/tasks.routes');

const app = express();

app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tasks', tasksRouter);

app.all('*', ( req, res, next ) => {
    next(
        new AppError(`${req.method} ${req.originalUrl} not found at this server`, 404)
    );
});

app.use(globalErrorHandler);

module.exports = {app};