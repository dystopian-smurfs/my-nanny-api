import Schedule from '../models/scheduleModel';

const scheduleRepository = {
  create: function createschedule({ utcLastReset }) {
    return Schedule.build({
      utcLastReset,
    });
  },

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
