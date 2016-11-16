import Sequelize from 'sequelize';
import db from '../connection';

const Schedule = db.define('schedule', {
  sunday: Sequelize.STRING,
  monday: Sequelize.STRING,
  tuesday: Sequelize.STRING,
  wednesday: Sequelize.STRING,
  thursday: Sequelize.STRING,
  friday: Sequelize.STRING,
  saturday: Sequelize.STRING,
  dateOfLastCurfew: Sequelize.STRING,
});

export default Schedule;
