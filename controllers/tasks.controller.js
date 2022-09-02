const { Task } = require('../models/tasks.model');

const { catchAsync } = require('../utils/catchAsync.util');

const createTask = catchAsync( async (req, res, next) => {
    const { task } = req.body;
    const { sessionUser } = req;

    const newTask = await Task.create({
        task, userId: sessionUser.id 
    });

    res.status(201).json({
        status: 'success',
        newTask
    });
} );


const getAllTasks = catchAsync( async(req, res, next) =>{
    const tasks = await Task.findAll({});

    res.status(200).json({
        status: 'success',
        tasks
    });
} );

const endTask = catchAsync( async(req, res, next) => {
    const { task } = req;

    await task.update({
        status: 'finished'
    });

    res.status(204).json({
        status: 'success'
    });
});

const finishedTasks = catchAsync( async(req, res, next) => {
    const tasks = await Task.findAll({ where: {status: 'finished'} });

    res.status(200).json({
        status: 'success',
        tasks
    });
});

const unfinishedTasks = catchAsync( async(req, res, next) =>{
    const tasks = await Task.findAll({ where: {status: 'active'} });

    res.status(200).json({
        status: 'success',
        tasks
    });
});

module.exports = { createTask, getAllTasks, endTask, finishedTasks, unfinishedTasks };