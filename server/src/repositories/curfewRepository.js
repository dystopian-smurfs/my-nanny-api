import Curfew from '../models/curfewModel';

/**
  * @module Repository: Curfew
*/
const curfewRepository = {
  /**
    * @function create
    * @param {object} data
    * @param data.utc - The UTC time the child will be late at
  */
  create: function createCurfew({ utc }) {
    return Curfew.build({
      utc,
    });
  },
  /**
    * @function update
    * @param {object} curfew - Instance of a curfew from the db
    * @param {object} changedAttributes - Obj with the keys and attributes to be updated
  */
  update: (curfew, changedAttributes) => {
    curfew.update(changedAttributes)
    .then((res) => {
      console.log('Curfew successfully updated');
      return res;
    });
  },

  destroy: curfew => curfew.destroy(),

  save: curfew => curfew.save(),


};

export default curfewRepository;
