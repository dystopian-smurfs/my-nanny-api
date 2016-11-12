import db from './connection';
import Parent from './models/parentModel';
import Child from './models/childModel';
import Chore from './models/choreModel';
import Schedule from './models/scheduleModel';
import Curfew from './models/curfewModel';

const initializeModels = () => {
  Parent.hasMany(Child);
  Child.hasMany(Chore);
  Child.hasOne(Schedule);
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
