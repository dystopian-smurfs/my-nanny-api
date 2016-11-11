import Sequelize from 'sequelize';
import db from '../connection';

const Schedule = db.define('schedule', {
  utcLastReset: Sequelize.INTEGER,
});

export default Schedule;
