import db from './connection';
import Account from './models/accountModel';
import Child from './models/childModel';
import Chore from './models/choreModel';
import Schedule from './models/scheduleModel';
import Curfew from './models/curfewModel';

const initializeModels = () => {
  Child.belongsTo(Account);
  Account.hasMany(Child);

  Chore.belongsTo(Child);
  Child.hasMany(Chore);

  Schedule.belongsTo(Child);
  Child.hasOne(Schedule);

  Curfew.belongsTo(Schedule);
  Schedule.hasMany(Curfew);
};

// Build the models
initializeModels();

// Sync the database
db
  .sync({ force: false })
  .then(() => console.log('Successfully synced models'))
  .catch(err => console.log('An error occurred while creating the table:', err));

export default initializeModels;
