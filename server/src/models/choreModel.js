import Sequelize from 'sequelize';
import db from '../connection';

const Chore = db.define('chore', {
  title: Sequelize.STRING,
  details: Sequelize.STRING,
  date: Sequelize.STRING,
  completed: Sequelize.BOOLEAN,
});

export default Chore;
