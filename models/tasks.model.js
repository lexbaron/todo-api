const { database, DataTypes } = require('../utils/database.util');
const { User } = require('./users.model');

const Task = database.define( 'task' ,{
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    task: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    }
});

module.exports = { Task };