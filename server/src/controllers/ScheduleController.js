import scheduleServices from '../services/scheduleServices';

const ScheduleController = {
  read: (req, res) => {
    res.send('Schedule read not implemented yet.');
  },

  create: (req, res) => {
    scheduleServices.create(req.body)
    .then(status => res.send(status))
    .catch(err => res.status(500).send(err));
  },

  update: (req, res) => {
    scheduleServices.update(req.body)
    .then(status => res.send(status))
    .catch(err => res.status(500).send(err));
  },

  destroy: (req, res) => {
    res.send('Schedule destroy not implemented yet.');
  },

};

export default ScheduleController;
