import Chore from '../models/choreModel';

/**
  * @module Repository: Chore
*/
const choreRepository = {
  /**
    * @function create
    * @param {object} data
    * @param data.title - The chore's title, what my-nanny will have alexa say
  */
  create: function createChore({ title, description, utc, status }) {
    return Chore.build({
      title,
      description,
      utc,
      status,
    });
  },
  /**
    * @function update
    * @param {object} chore - Instance of a chore from the db
    * @param {object} changedAttributes - Obj with the keys and attributes to be updated
  */
  update: (chore, changedAttributes) => {
    chore.update(changedAttributes)
    .then((res) => {
      console.log('Chore successfully updated');
      return res;
    });
  },

  destroy: chore => chore.destroy(),

  save: chore => chore.save(),


};

export default choreRepository;
