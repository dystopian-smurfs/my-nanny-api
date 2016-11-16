import Promise from 'bluebird';
import Account from '../models/accountModel';
import Child from '../models/childModel';
import Chore from '../models/choreModel';
import Schedule from '../models/scheduleModel';
import Curfew from '../models/curfewModel';
import accountRepository from '../repositories/accountRepository';
import childRepository from '../repositories/childRepository';
import choreRepository from '../repositories/choreRepository';
import scheduleRepository from '../repositories/scheduleRepository';
import curfewRepository from '../repositories/curfewRepository';
import db from '../connection';

/** @module Services: Account */
const accountServices = {
  /**
    * @function createNewAccount
    * @param {object} data - An object with new account info
    * @param {string} data.account.username
    * @param {string} data.account.token - The token given my Amazon's OAuth
    * @param {string} data.account.amazonId - The account's Amazon Id
    * @param {string} data.account.timeZone
    * @param {object} data.account.phone
    * @param {object} data.account.email
    * @returns {promise}
   */
  createNewAccount: data =>
    new Promise((resolve, reject) => {
      accountRepository.findAccountByAmazonId(data.account.amazonId)
      .then((account) => {
        if (account) {
          // If account exists already, return an error
          reject('Failed to create account.');
        } else {
          const newAccount = accountRepository.create(data.account);
          newAccount.save();
          const { username, token } = newAccount;
          resolve(JSON.stringify({ username, token }));
        }
      });
    }),

  /**
    * @function login
    * @param {object} data - Contains an account
    * @param {object} data.account
    * @param {string} data.account.amazonId
    * @returns {promise} - Resolves to the user's account info
  */
  login: data =>
    new Promise((resolve, reject) => {
      accountRepository.findAccountByAmazonId(data.account.amazonId)
      .then((account) => {
        if (!account) {
          // If account does not exist, login
          reject('Failed to log in.');
        } else {
          const { username, token } = account;
          resolve(JSON.stringify({ username, token }));
        }
      });
    }),

  /**
    * @function addChild
    * @param {object} data - Contains separate account and child objects
    * @param {object} data.account - Contains a account's info
    * @param {string} data.account.amazonId
    * @param {object} data.child - The child
    * @param {string} data.child.name
    * @param {string} data.child.phone
    * @returns {promise}
  */
  addChild: data =>
    new Promise((resolve, reject) => {
      accountRepository.findAccountByAmazonId(data.account.amazonId)
      .then((account) => {
        if (!account) {
          reject('Cannot add child, account does not exist.');
        } else {
          childRepository.findOneByAmazonId(data.child, data.account.amazonId)
          .then((children) => {
            if (children.length) {
              reject('Child already exists');
            } else {
              const newChild = childRepository.create(account, data.child);
              newChild.save();
              account.addChild(newChild);
              resolve('Child successfully added.');
            }
          });
        }
      });
    }),

  /**
    * @function updateChild
    * @param {object} data - Contains an account
    * @param {object} data.account - Contains amazonId
    * @param {string} data.account.amazonId
    * @param {object} data.child - MUST contains ORIGINAL child name
    * @param {string} data.child.name - MUST be ORIGINAL child name
    * @param {string} data.updatedChild.name - Child's updated name
    * @param {string} data.updatedChild.phone - Child's updated name
    * @returns {promise}
  */
  updateChild: data =>
  new Promise((resolve, reject) => {
    accountRepository.findAccountByAmazonId(data.account.amazonId)
      .then((account) => {
        if (!account) {
          reject('Cannot edit child, account does not exist.');
        } else {
          childRepository.findOneByAmazonId(data.child, data.account.amazonId)
          .then((children) => {
            if (!children.length) {
              reject('Child doesn\'t exist.');
            } else {
              // Check if another child is already called what you passed in as name
              childRepository.findOneByAmazonId(data.updatedChild, data.account.amazonId)
              .then((duplicateChildren) => {
                if (duplicateChildren.length) {
                  reject('Another child is already named what you tried to update this child');
                } else {
                  children[0].updateAttributes(data.updatedChild)
                  .on('success', resolve('Child updated successfully.'))
                  .on('error', reject('Error updating child.'));
                }
              });
            }
          });
        }
      });
  }),
  /**
    * @function updateAccount
    * @param {object} data - Contains an account
    * @param {object} data.account - Contains amazonId
    * @param {string} data.account.amazonId
    * @param {object} data.updatedAccount
    * @returns {promise}
  */
  updateAccount: data =>
    new Promise((resolve, reject) => {
      accountRepository.findAccountByAmazonId(data.account.amazonId)
      .then((account) => {
        if (!account) {
          reject('Cannot update account. Account doesn\'t exist');
        } else {
          account.updateAttributes(data.updatedAccount);
          resolve('Account updated successfully.');
        }
      });
    }),

};

export default accountServices;
