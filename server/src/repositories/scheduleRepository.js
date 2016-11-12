import Schedule from '../models/scheduleModel';

/**
  * @module Repository: Schedule
*/
const scheduleRepository = {
  create: function createschedule({ utcLastReset }) {
    return Schedule.build({
      utcLastReset,
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

};

export default scheduleRepository;
