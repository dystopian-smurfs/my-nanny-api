import Chore from '../models/choreModel';

/**
  * @module Repository: Chore
*/
const choresRepository = {
  /**
    * @function create
    * @param {object} data
    * @param data.title - The chore's title, what my-nanny will have alexa say
    * @param data.description - Extra details for the child
    * @param data.date - "2016-14-3"
  */
  // create: function createChore({ title, details, date }) {
  //   return Chore.build({
  //     title,
  //     details,
  //     date,
  //     completed: 'false',
  //   });
  // },
  create: function createChild(child, { title, details, date }) {
    return Chore.build(Object.assign({},
      { childId: child.get('id') },
      { title, details, date, completed: false },
      ));
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

export default choresRepository;
