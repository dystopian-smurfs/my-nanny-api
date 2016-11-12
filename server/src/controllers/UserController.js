import accountServices from '../services/accountServices';

const UserController = {
  login: (req, res) => {
    res.send('User login is not implemented yet');
  },

  logout: (req, res) => {
    res.send('User logout is not implemented yet');
  },

  signup: (req, res) => {
    accountServices.createNewAccount(req.body.parent, status => res.send(status));
  },
};

export default UserController;
