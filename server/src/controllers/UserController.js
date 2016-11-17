import Promise from 'bluebird';
import accountServices from '../services/accountServices';

const UserController = {
  login: (req, res) => {
    accountServices.login(req.body, req.user.id)
    .then(status => res.send(status))
    .catch(err => res.status(500).send(err));
  },

  logout: (req, res) => {
    res.send('User logout is not implemented yet');
  },

  create: (pseudoBody, amazonId) =>
    new Promise(resolve =>
      accountServices.createNewAccount(pseudoBody, amazonId)
      .then(status => resolve(true))
      // We don't care if there was a failure making the account
        // It will fail if the account already exists
        // Even if it fails the first time,
        // The client won't recieve any info
        // For someone elses account
        // Because of their cookie
      .catch(err => resolve(false))),

  updateAccount: (req, res) => {
    accountServices.updateAccount(req.body, req.user.id)
    .then(status => res.send(status))
    .catch(err => res.status(500).send(err));
  },

  getInfo: (amazonId, res) => {
    accountServices.getAccountInfo({
      account: {
        amazonId,
      },
    })
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
  },

};

export default UserController;
