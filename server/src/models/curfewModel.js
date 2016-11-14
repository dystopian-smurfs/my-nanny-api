import Sequelize from 'sequelize';
import db from '../connection';

const Curfew = db.define('curfew', {
  utc: Sequelize.STRING,
});

export default Curfew;
