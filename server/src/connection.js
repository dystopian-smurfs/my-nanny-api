import Sequelize from 'sequelize';

const getConnection = () =>
  new Sequelize('test', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
  });

const connection = getConnection();

// authenticate the connection
connection
  .authenticate()
  .then(() => console.log('Sequelize connection has been established successfully.'))
  .catch(err => console.log('Unable to connect to the database:', err));

export default connection;
