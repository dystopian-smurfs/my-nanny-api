import Sequelize from 'sequelize';
import db from '../connection';

const Parent = db.define('parent', {
  householdName: Sequelize.STRING,
  token: Sequelize.STRING,
  amazonId: Sequelize.STRING,
  timeZone: Sequelize.STRING,
  phone: Sequelize.STRING,
  email: Sequelize.STRING,
});

export default Parent;
