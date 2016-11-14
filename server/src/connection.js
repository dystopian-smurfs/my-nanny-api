import Sequelize from 'sequelize';
import config from './config';

const getConnection = () =>
  new Sequelize(config.database, config.username, config.password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
  });

const connection = getConnection();

// authenticate the connection
connection
  .authenticate()
  .then(() => console.log(`Sequelize connection has been established successfully to db: ${config.database}`))
  .catch(err => console.log('Unable to connect to the database:', err));

export default connection;
