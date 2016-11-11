import Sequelize from 'sequelize';
import db from '../connection';

const Curfew = db.define('curfew', {
  startUTC: Sequelize.INTEGER,
  endUTC: Sequelize.INTEGER,
});

export default Curfew;
