import Chore from '../models/choreModel';

const choreRepository = {
  create: function createChore({ title, description, utc, status }) {
    return Chore.build({
      title,
      description,
      utc,
      status,
    });
  },

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
