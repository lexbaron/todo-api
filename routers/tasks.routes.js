const express = require('express');

const { taskExist } = require('../middlewares/tasks.middleware');
const { protectSession } = require('../middlewares/auth.middleware');

const {
    createTask,
    getAllTasks,
    endTask,
    finishedTasks,
    unfinishedTasks
} = require('../controllers/tasks.controller');

const tasksRouter = express.Router();

tasksRouter.use(protectSession);

tasksRouter.post('/', createTask);
tasksRouter.get('/', getAllTasks);
tasksRouter.patch('/:id', taskExist, endTask );
tasksRouter.get('/finished', finishedTasks);
tasksRouter.get('/unfinished', unfinishedTasks);



module.exports = {tasksRouter};