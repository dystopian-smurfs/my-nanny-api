import Child from '../models/childModel';
/**
  * @module Repository: Child
*/
const childRepository = {
  /**
    * @function create
    * @param {object} data
    * @param data.name - Child's first name
    * @param data.phone - Child's phone number
  */
  create: function createChild(parent, { name, phone }) {
    return Child.build(Object.assign({}, { parentId: parent.get('id') }, { name, phone }));
  },

  /**
    * @function update
    * @param {object} child - Instance of a child from the db
    * @param {object} changedAttributes - Obj with the keys and attributes to be updated
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
    * @param {object} child - Instance of a child from the db.
  */
  destroy: child => child.destroy(),

  /**
    * @function save
    * @description - Useless, it is easier to just call .save() on a model instance
    * @param {object} child - The child instance you built
  */
  save: child => child.save(),

};


export default childRepository;
