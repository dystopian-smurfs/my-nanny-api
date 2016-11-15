import Schedule from '../models/scheduleModel';
import Account from '../models/accountModel';
import Child from '../models/ChildModel';

/**
  * @module Repository: Schedule
*/
const scheduleRepository = {
  create: function createschedule({ defaultCurfews }) {
    return Schedule.build({
      defaultCurfews,
      dateOfLastCurew: '2000-12-31',
    });
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
    new Promise((resolve) => {
      Account.findOne({
        where: {
          amazonId,
        },
        include: [{
          model: Child,
          where: {
            name,
          },
        }],
      })
      .then((foundAccount) => {
        if (foundAccount) {
          // TODO: change .schedule[0] to the actual structure of returned object
          // resolve(foundAccount.children[0].schedule[0]);
          resolve(null);
        } else {
          resolve(null);
        }
      })
      .catch(err => console.log(err));
    }),

};

export default scheduleRepository;
