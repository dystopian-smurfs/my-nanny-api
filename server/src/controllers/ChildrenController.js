import childrenServices from '../services/childrenServices';

const ChildrenController = {

  addChild: (req, res) => {
    childrenServices.addChild(req.body)
    .then(status => res.send(status))
    .catch(err => res.status(500).send(err));
  },

  updateChild: (req, res) => {
    childrenServices.updateChild(req.body)
    .then(status => res.send(status))
    .catch(err => res.status(500).send(err));
  },

};

export default ChildrenController;
