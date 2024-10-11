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

const create = async () => {
    await sequelize.query(`
        CREATE TABLE IF NOT EXISTS users (id SERIAL NOT NULL PRIMARY KEY, name varchar(40) NOT NULL, updated_at TIMESTAMP NOT NULL DEFAULT NOW());
    `);

    await sequelize.query(`
        CREATE OR REPLACE FUNCTION trigger_set_timestamp()
        RETURNS TRIGGER AS $$
        BEGIN   
          NEW.updated_at = now();
          RETURN NEW;
        END;
        $$ language 'plpgsql';
      
        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION trigger_set_timestamp();
    `);
}

const insert = async () => {
    await sequelize.query(`
        INSERT INTO users (name) VALUES ('Max');
    `);
}

const run = async () => {
    await connect();
    await create();
    await insert();
}

run();


