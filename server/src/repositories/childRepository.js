import Child from '../models/childModel';

const childRepository = {
  create: function createChild({ name, phone }) {
    return Child.build({ name, phone });
  },

  update: (child, changedAttributes) => {
    child.update(changedAttributes)
    .then((res) => {
      console.log('Child successfully updated');
      return res;
    });
  },

  destroy: child => child.destroy(),

  save: child => child.save(),

};


export default childRepository;
