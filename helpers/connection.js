const { Sequelize: Connection } = require('sequelize');

// const sequelize = new Connection('postgres://postgres:password@localhost:5432/test');

const connection = new Connection('test', 'postgres', 'password', {
    dialect: 'postgres'
});

connection
    .authenticate()
    .then(() => {
        console.log('Connection successfully.');
    })
    .catch(console.error);

connection.sync();

module.exports = connection;