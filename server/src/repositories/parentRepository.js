import Parent from '../models/parentModel';

const parentRepository = {
  create: function createparent({ householdName, token, amazonId, timeZone, phone, email }) {
    return Parent.build({
      householdName,
      token,
      amazonId,
      timeZone,
      phone,
      email,
    });
  },

  update: (parent, changedAttributes) => {
    parent.update(changedAttributes)
    .then((res) => {
      console.log('Parent successfully updated');
      return res;
    });
  },

  destroy: parent => parent.destroy(),

  save: parent => parent.save(),


};

export default parentRepository;
