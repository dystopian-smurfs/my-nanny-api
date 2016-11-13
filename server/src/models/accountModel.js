import Sequelize from 'sequelize';
import db from '../connection';

const Account = db.define('account', {
  token: Sequelize.STRING,
  username: Sequelize.STRING,
  amazonId: Sequelize.STRING,
  timeZone: Sequelize.STRING,
  phone: Sequelize.STRING,
  email: Sequelize.STRING,
});

export default Account;
