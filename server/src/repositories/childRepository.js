import Child from '../models/childModel';

/** @namespace childRepository */
const childRepository = {
  /**
    * @function create
    * @memberof childRepository
    * @param {object} data
    * @param data.name - Child's first name
    * @param data.phone - Child's phone number
  */
  create: function createChild({ name, phone }) {
    return Child.build({ name, phone });
  },
  /**
    * @function update
    * @memberof childRepository
    * @param {object} child - Instance of a child from the db.
    * @param {object} changedAttributes - Obj with the keys and attributes to be updated.
  */
  update: (child, changedAttributes) => {
    child.update(changedAttributes)
    .then((res) => {
      console.log('Child successfully updated');
      return res;
    });
  },
  /**
    * @function destroy
    * @memberof childRepository
    * @param {object} child - Instance of a child from the db.
  */
  destroy: child => child.destroy(),

  save: child => child.save(),

};


export default childRepository;
