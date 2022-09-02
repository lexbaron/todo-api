const express = require('express');

const { protectSession, protectUserAccount } = require('../middlewares/auth.middleware');

const {
login,
getAllUsers
} = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.post('/login', login);

module.exports = {usersRouter};