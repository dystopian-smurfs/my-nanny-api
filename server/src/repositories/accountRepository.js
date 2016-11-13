import Account from '../models/accountModel';

/**
  * @module Repository: Account
*/
const accountRepository = {
  /**
    * @function create
    * @param {object} data
    * @param data.username - The username for the account
    * @param data.token - Account's phone number
    * @param data.amazonId - Account's id from amazon
    * @param data.timeZone - Account's timeZone
    * @param data.phone - Account's phone number
    * @param data.email - Account's email
  */
  create: function createaccount({ username, token, amazonId, timeZone, phone, email }) {
    return Account.build({
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
    * @param {object} account - Instance of a account from the db
    * @param {object} changedAttributes - Obj with the keys and attributes to be updated
  */
  update: (account, changedAttributes) => {
    account.update(changedAttributes)
    .then((res) => {
      console.log('Account successfully updated');
      return res;
    });
  },

  destroy: account => account.destroy(),

  save: account => account.save(),

  /**
    * @function findAccountByAmazonId
    * @param {string} amazonId - The amazonId of the account
   */
  findAccountByAmazonId: amazonId =>
    Account.findOne({ where: { amazonId } }),

  /**
    * @function findAccountByEmail
    * @param {string} email - The email of the account
   */
  findAccountByEmail: email =>
    Account.findOne({ where: { email } }),

  /**
    * @function findAccountByPhone
    * @param {string} phone - The phone number of the account
   */
  findAccountByPhone: phone =>
    Account.findOne({ where: { phone } }),

  /**
    * @function findAccountByUsername
    * @param {string} username - The username of the account
  */
  findAccountByUsername: username =>
    Account.findOne({ where: { username } }),


};

export default accountRepository;
