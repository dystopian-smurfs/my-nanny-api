import choresServices from '../services/choresServices';

const ChoresController = {
  create: (req, res) => {
    choresServices.addChore(req.body)
    .then(status => res.send(status))
    .catch(err => res.send(err));
  },

  read: (req, res) => {
    res.send('Chors read is not implemented yet');
  },

  readAll: (req, res) => {
    res.send('Chors read all is not implemented yet');
  },

  update: (req, res) => {
    res.send('Chors update is not implemented yet');
  },

  destroy: (req, res) => {
    res.send('Chors destroy is not implemented yet');
  },
};

export default ChoresController;
