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
    await sequelize.query(
        'CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name varchar(40) NOT NULL, updated_at TIMESTAMP NOT NULL)'
    );

    await sequelize.query(`
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updatedAt = now();
          RETURN NEW;
        END;
        $$ language 'plpgsql';
      
        CREATE TRIGGER update_timestamp
        BEFORE UPDATE ON "users"
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
      `);
}

connect();
create();

