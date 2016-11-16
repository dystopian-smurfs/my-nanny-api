import Child from '../models/childModel';
import Account from '../models/accountModel';
import Schedule from '../models/scheduleModel';
import Chore from '../models/choreModel';

/**
  * @module Repository: Child
*/
const childrenRepository = {
  /**
    * @function create
    * @param {object} data
    * @param data.name - Child's first name
    * @param data.phone - Child's phone number
  */
  create: function createChild(account, { name, phone }) {
    return Child.build(Object.assign({}, { accountId: account.get('id') }, { name, phone }));
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

  /**
    * @function findOneByIdAmazonId
    * @desc Finds one child based on their name and accoutn amazonId
    * @param {object} child
    * @param {string} child.name
    * @param {string} amazonId - The amazonId of the account
    * @returns {promise} promise - Resolves to array of children or []
   */
  findOneByIdAmazonId: ({ id }, amazonId) =>
    new Promise((resolve) => {
      Account.findOne({
        where: {
          amazonId,
        },
        include: [{
          model: Child,
          where: {
            id,
          },
        }],
      })
      .then((foundAccount) => {
        if (foundAccount) {
          resolve(foundAccount.children[0]);
        } else {
          resolve(null);
        }
      })
      .catch(err => console.log(err));
    }),

  /**
    * @function findOneByIdAmazonId
    * @desc Finds one child of a account based on their id and account amazonId
    * @param {object} child
    * @param {string} child.name
    * @param {string} amazonId - The amazonId of the account
    * @returns {promise} promise - Resolves to array of children or []
   */
  findOneByNameAmazonId: ({ name }, amazonId) =>
    new Promise((resolve) => {
      Account.findOne({
        where: {
          amazonId,
        },
        include: [{
          model: Child,
          where: {
            name,
          },
        }],
      })
      .then((foundAccount) => {
        if (foundAccount) {
          resolve(foundAccount.children[0]);
        } else {
          resolve(null);
        }
      })
      .catch(err => console.log(err));
    }),

  /**
    * @function findAllByAmazonId
    *
    *
    *
    *
  */
  findAllByAmazonId: amazonId =>
    new Promise((resolve, reject) => {
      Account.findOne({
        where: {
          amazonId,
        },
        include: [{
          model: Child,
          include: [Schedule, Chore],
        }],
      })
      .then((foundAccount) => {
        if (foundAccount) {
          resolve(foundAccount.children);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
    }),

  /**
    * @function findAccountByEmail
    * @param {string} email
   */
  findAccountByEmail: email =>
    Child.findOne({ where: { email } }),

  /**
    * @function findAccountByPhone
    * @param {string} phone
   */
  findAccountByPhone: phone =>
    Child.findOne({ where: { phone } }),

};

export default childrenRepository;
