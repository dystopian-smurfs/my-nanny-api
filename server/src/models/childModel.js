import Sequelize from 'sequelize';
import db from '../connection';

const Child = db.define('child', {
  name: Sequelize.STRING,
  phone: Sequelize.STRING,
});

export default Child;
