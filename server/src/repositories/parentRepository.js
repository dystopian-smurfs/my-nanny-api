import Parent from '../models/parentModel';

/**
  * @module Repository: Parent
*/
const parentRepository = {
  /**
    * @function create
    * @param {object} data
    * @param data.username - The username for the account
    * @param data.token - Parent's phone number
    * @param data.amazonId - Parent's id from amazon
    * @param data.timeZone - Parent's timeZone
    * @param data.phone - Parent's phone number
    * @param data.email - Parent's email
  */
  create: function createparent({ username, token, amazonId, timeZone, phone, email }) {
    return Parent.build({
      username,
      token,
      amazonId,
      timeZone,
      phone,
      email,
    });
  },
  /**
    * @function update
    * @param {object} parent - Instance of a parent from the db
    * @param {object} changedAttributes - Obj with the keys and attributes to be updated
  */
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
