const { User } = require('./users.model');
const { Task } = require('./tasks.model');

const initModels = () =>{
    User.hasMany(Task);
    Task.belongsTo(User);
};

module.exports = {initModels}; 