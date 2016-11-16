import accountServices from '../services/accountServices';

const UserController = {
  login: (req, res) => {
    accountServices.login(req.body)
    .then(status => res.send(status))
    .catch(err => res.status(500).send(err));
  },

  logout: (req, res) => {
    res.send('User logout is not implemented yet');
  },

  signup: (req, res) => {
    accountServices.createNewAccount(req.body)
    .then(status => res.send(status))
    .catch(err => res.status(500).send(err));
  },

  updateAccount: (req, res) => {
    accountServices.updateAccount(req.body)
    .then(status => res.send(status))
    .catch(err => res.status(500).send(err));
  },

  getInfo: (req, res) => {
    accountServices.getAccountInfo({
      account: {
        amazonId: req.query.amazonId,
      },
    })
    .then(status => res.send(status))
    .catch(err => res.status(500).send(err));
  },

};

export default UserController;
