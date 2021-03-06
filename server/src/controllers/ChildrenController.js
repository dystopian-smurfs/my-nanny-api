import childrenServices from '../services/childrenServices';

const ChildrenController = {

  addChild: (req, res) => {
    childrenServices.addChild(req.body, req.user.emails[0].value)
    .then(status => res.send(status))
    .catch(err => res.status(500).send(err));
  },

  updateChild: (req, res) => {
    childrenServices.updateChild(req.body, req.user.emails[0].value)
    .then(status => res.send(status))
    .catch(err => res.status(500).send(err));
  },

  deleteChild: (req, res) => {
    childrenServices.deleteChild(req.body, req.user.emails[0].value)
    .then(status => res.send(status))
    .catch(err => res.status(500).send(err));
  },

  getChildren: (req, res) => {
    childrenServices.getChildren(req.body, req.user.emails[0].value)
    .then(status => res.send(status))
    .catch(err => res.status(500).send(err));
  },

  getChild: (req, res) => {
    // console.log('id', req.params.id);
    childrenServices.getChild(req.body, req.user.emails[0].value, req.params.id)
    .then(status => res.send(status))
    .catch(err => res.status(500).send(err));
  },

};

export default ChildrenController;
