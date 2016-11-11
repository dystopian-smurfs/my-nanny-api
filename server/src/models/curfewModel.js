import Sequelize from 'sequelize';
import db from '../connection';

const Curfew = db.define('curfew', {
  utc: Sequelize.INTEGER,
});

export default Curfew;
