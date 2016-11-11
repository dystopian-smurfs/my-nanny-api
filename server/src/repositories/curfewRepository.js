import Curfew from '../models/curfewModel';

const curfewRepository = {
  create: function createCurfew({ utc }) {
    return Curfew.build({
      utc,
    });
  },

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
