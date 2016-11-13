import accountServices from '../services/accountServices';

const UserController = {
  login: (req, res) => {
    accountServices.login(req.body)
    .then(status => res.send(status))
    .catch(err => res.send(err));
  },

  logout: (req, res) => {
    res.send('User logout is not implemented yet');
  },

  signup: (req, res) => {
    accountServices.createNewAccount(req.body)
    .then(status => res.send(status))
    .catch(err => res.send(err));
  },

  addChild: (req, res) => {
    accountServices.addChild(req.body)
    .then(status => res.send(status))
    .catch(err => res.send(err));
  },

  editChild: (req, res) => {
    accountServices.editChild(req.body)
    .then(status => res.send(status))
    .catch(err => res.send(err));
  },
};

export default UserController;
