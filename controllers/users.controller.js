const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models/users.model')

const { catchAsync } = require('../utils/catchAsync.util');

dotenv.config({path: './config.env'});


const createUser = catchAsync( async( req, res, next ) => {
    const { email } = req.body;

    const newUser = await User.create({

        email

    });

    res.status(201).json({
        status: 'success',
        newUser
    });
});

const login = catchAsync( async( req, res, next ) => {
    const { email } = req.body;

    let user = await User.findOne({where: {email, status: 'active'}});

    if(!user){
        user = await User.create({

            email
    
        });
    };

    const token = await jwt.sign({id: user.id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.status(200).json({
        status: 'success',
        token
    });
});

const getAllUsers = catchAsync( async (req, res, next) => {
    const users = await User.findAll({});

    res.status(200).json({
        status: 'success',
        users
    });
});

const logOut = catchAsync( async(req, res, next) => {
    // const { sessionUser } = req;

    // let user = await User.findOne({where: {sessionUser.id}});

    // if(!user){
    //     user = await User.create({

    //         email
    
    //     });
    // };

    // const token = await jwt.sign({id: user.id}, process.env.JWT_SECRET, {
    //     expiresIn: '30d'
    // });

    // res.status(200).json({
    //     status: 'success',
    //     token
    // });
})

module.exports = { login, getAllUsers };