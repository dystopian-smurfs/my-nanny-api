import accountServices from '../services/accountServices';

const UserController = {
  logout: (req, res) => {
    req.logout();
    res.sendStatus(200);
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
