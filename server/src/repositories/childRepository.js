import Child from '../models/childModel';
import Account from '../models/accountModel';
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
    * @function findAccountByAmazonId
    * @desc Finds all children of a account based on their name
    * @param {object} child
    * @param {string} child.name
    * @param {string} amazonId - The amazonId of the account
    * @returns {promise} promise - Resolves to array of children or []
   */
  findOneByAmazonId: ({ name }, amazonId) =>
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
        console.log('FOUND Account: ', foundAccount);
        if (foundAccount) {
          resolve(foundAccount.children);
        } else {
          resolve([]);
        }
      })
      .catch(err => console.log(err));
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

export default childRepository;
