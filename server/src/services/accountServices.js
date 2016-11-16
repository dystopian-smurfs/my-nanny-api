import Promise from 'bluebird';
import Account from '../models/accountModel';
import Child from '../models/childModel';
import Chore from '../models/choreModel';
import Schedule from '../models/scheduleModel';
import Curfew from '../models/curfewModel';
import accountRepository from '../repositories/accountRepository';
import childrenRepository from '../repositories/childrenRepository';
import choresRepository from '../repositories/choresRepository';
import scheduleRepository from '../repositories/scheduleRepository';
import curfewsRepository from '../repositories/curfewsRepository';
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
          const { id, username, token } = newAccount;
          resolve(JSON.stringify({ id, username, token }));
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
          // If account does not exist, login fails
          reject('Failed to log in.');
        } else {
          // send them all the info for the account
          accountRepository.getAllAccountInfo(account.amazonId)
          .then(accountInfo => resolve(JSON.stringify(accountInfo)));
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

  getAccountInfo: data =>
    new Promise((resolve, reject) => {
      accountRepository.findAccountByAmazonId(data.account.amazonId)
      .then((account) => {
        if (!account) {
          // If account does not exist, login fails
          reject('Failed to get account info, account does not exist.');
        } else {
          // send them all the info for the account
          accountRepository.getAllAccountInfo(account.amazonId)
          .then(accountInfo => resolve(JSON.stringify(accountInfo)));
        }
      });
    }),
};

export default accountServices;
