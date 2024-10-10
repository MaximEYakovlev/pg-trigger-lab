const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres_db', 'user', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connect();

sequelize.query(
    'CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name varchar(40) NOT NULL, updated_at TIMESTAMP NOT NULL)'
);