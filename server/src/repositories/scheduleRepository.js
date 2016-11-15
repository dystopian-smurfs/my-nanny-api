import Schedule from '../models/scheduleModel';
import Account from '../models/accountModel';
import Child from '../models/childModel';

/**
  * @module Repository: Schedule
*/
const scheduleRepository = {
  create: function createschedule({ defaultCurfews }, child) {
    return Schedule.build(
      Object.assign({}, { childId: child.get('id') },
        {
          defaultCurfews: JSON.stringify(defaultCurfews),
          dateOfLastCurfew: '2000-12-31',
        }));
  },

  /**
    * @function update
    * @param {object} schedule - Instance of a schedule from the db
    * @param {object} changedAttributes - Obj with the keys and attributes to be updated
  */
  update: (schedule, changedAttributes) => {
    schedule.update(changedAttributes)
    .then((res) => {
      console.log('Schedule successfully updated');
      return res;
    });
  },

  destroy: schedule => schedule.destroy(),

  save: schedule => schedule.save(),

  findScheduleIfExists: ({ name }, amazonId) =>
    new Promise((resolve, reject) => {
      Account.findOne({
        where: {
          amazonId,
        },
        include: [{
          model: Child,
          where: {
            name,
          },
          include: [Schedule],
        }],
      })
      .then((foundAccount) => {
        if (foundAccount && foundAccount.hasOwnProperty('children') && foundAccount.children[0].hasOwnProperty('schedule')) {
          // TODO: change .schedule[0] to the actual structure of returned object
          // resolve(foundAccount.children[0].schedule[0]);
          // console.log('SCHEDULE WILL APPEAR HERE: ', foundAccount.children[0].schedule);
          resolve(foundAccount.children[0].schedule);
        } else if (foundAccount && foundAccount.hasOwnProperty('children')) {
          resolve(null);
        } else {
          reject('Account does not have children or does not exist.');
        }
      })
      .catch(err => console.log('ERROR finding schedule', err));
    }),

};

export default scheduleRepository;
