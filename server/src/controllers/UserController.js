import accountServices from '../services/accountServices';

const UserController = {
  login: (req, res) => {
    accountServices.login(req.body, status => res.send(status));
  },

  logout: (req, res) => {
    res.send('User logout is not implemented yet');
  },

  signup: (req, res) => {
    accountServices.createNewAccount(req.body, status => res.send(status));
  },

  addChild: (req, res) => {
    accountServices.addChild(req.body, status => res.send(status));
  },
};

export default UserController;
