import Sequelize from 'sequelize';
import db from '../connection';

const Chore = db.define('chore', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  utc: Sequelize.INTEGER,
  status: Sequelize.BOOLEAN,
});

export default Chore;
