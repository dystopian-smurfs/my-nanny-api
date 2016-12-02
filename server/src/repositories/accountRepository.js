import Account from '../models/accountModel';
import Child from '../models/childModel';
import Chore from '../models/choreModel';
import Schedule from '../models/scheduleModel';

/**
  * @module Repository: Account
*/
const accountRepository = {
  /**
    * @function create
    * @param {object} data - An object with new account info
    * @param data.username - The username, usually a full name, from Amazon OAuth
    * @param email - The account's email from Amazon OAuth
  */
  create: function createaccount({ username }, email) {
    return Account.build({
      username,
      email,
    });
  },

  /**
    * @function findByEmail
    * @param {string} email - The email given by Amazon OAuth associated with the account
   */
  findByEmail: email =>
    Account.findOne({ where: { email } }),

  /**
   * @typedef {Object} returnedAccountInfo
   * @property {object} account
   * @property {number} account.id - The account's id given by Sequelize
   * @property {string} account.username
   * @property {string} account.email - The email given by Amazon OAuth
   * @property {string} account.phone
   * @property {string} account.timezone
   * @property {array} account.children - An array of children
   * @property {string} account.children.name
   * @property {string} account.children.phone
   */
  /**
    * @function read
    * @param {string} email - The email given by Amazon OAuth associated with the account
    * @returns {returnedAccountInfo} - Resolves to a stringified object
   */
  read: email =>
    new Promise((resolve, reject) => {
      Account.findOne({
        where: {
          email,
        },
        attributes:
        ['id',
          'username',
          'email',
          'timezone',
          'phone'],
        include: [{
          model: Child,
          attributes:
          ['id',
            'name',
            'photo',
            'phone'],
        }],
      })
      .then((accountInfo) => {
        if (accountInfo) {
          resolve(accountInfo);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
    }),

  readAlexa: email =>
    new Promise((resolve, reject) => {
      Account.findOne({
        where: {
          email,
        },
        attributes:
        ['id',
          'username',
          'email',
          'timezone',
          'phone'],
        include: [{
          model: Child,
          attributes:
          ['id',
            'name',
            'photo',
            'phone'],
          include: [{
            model: Chore,
            attributes:
            ['id',
              'title',
              'details',
              'date',
              'childId',
              'completed'],
          }, {
            model: Schedule,
            attributes: {
              exclude: [
                'createdAt',
                'updatedAt'],
            },
          }],
        }],
      })
      .then((accountInfo) => {
        if (accountInfo) {
          resolve(accountInfo);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
    }),
};

export default accountRepository;
