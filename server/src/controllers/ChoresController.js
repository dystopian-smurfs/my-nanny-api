import choresServices from '../services/choresServices';

const ChoresController = {
  create: (req, res) => {
    choresServices.create(req.body)
    .then(status => res.send(status))
    .catch(err => res.status(500).send(err));
  },

  read: (req, res) => {
    res.send('Chors read is not implemented yet');
  },

  readAll: (req, res) => {
    res.send('Chors read all is not implemented yet');
  },

  update: (req, res) => {
    choresServices.update()
    .then(status => res.send(status))
    .catch(err => res.status(500).send(err));
  },

  destroy: (req, res) => {
    res.send('Chors destroy is not implemented yet');
  },
};

export default ChoresController;
