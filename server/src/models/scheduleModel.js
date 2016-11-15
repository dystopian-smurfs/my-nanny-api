import Sequelize from 'sequelize';
import db from '../connection';

const Schedule = db.define('schedule', {
  defaultCurfews: Sequelize.STRING,
  dateOfLastCurfew: Sequelize.STRING,
});

export default Schedule;
