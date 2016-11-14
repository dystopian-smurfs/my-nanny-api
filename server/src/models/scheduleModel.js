import Sequelize from 'sequelize';
import db from '../connection';

const Schedule = db.define('schedule', {
  dateOfLastCurfew: Sequelize.STRING,
  defaultCurfews: Sequelize.STRING,
});

export default Schedule;
