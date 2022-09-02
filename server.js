require('./env');

const { app } = require('./app');

const { database } = require('./utils/dataBase.util');
const { Task } = require('./models/tasks.model');
const { User } = require('./models/users.model');



database.authenticate()
    .then(console.log('database authenticated'))
    .catch(err => console.log(err));

Task.sync({force: true});

User.sync();

database.sync()
    .then(console.log('database synced'))
    .catch(err => console.log(err))

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});