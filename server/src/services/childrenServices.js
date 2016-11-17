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

/** @module Services: Children */
const childrenServices = {

  /**
    * @function addChild
    * @param {object} data - Contains separate account and child objects
    * @param {object} data.account - Contains a account's info
    * @param {string} amazonId
    * @param {object} data.child - The child
    * @param {string} data.child.name
    * @param {string} data.child.phone
    * @returns {promise}
  */
  addChild: (data, amazonId) =>
    new Promise((resolve, reject) => {
      accountRepository.findAccountByAmazonId(amazonId)
      .then((account) => {
        if (!account) {
          reject('Cannot add child, account does not exist.');
        } else {
          childrenRepository.findOneByNameAmazonId(data.child, amazonId)
          .then((children) => {
            if (children) {
              reject('Child already exists');
            } else {
              const newChild = childrenRepository.create(account, data.child);
              newChild.save()
              .then(() => account.addChild(newChild));
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
    * @param {string} amazonId
    * @param {object} data.child - MUST contains ORIGINAL child name
    * @param {string} data.child.name - MUST be ORIGINAL child name
    * @param {string} data.updatedChild.name - Child's updated name
    * @param {string} data.updatedChild.phone - Child's updated name
    * @returns {promise}
  */
  updateChild: (data, amazonId) =>
  new Promise((resolve, reject) => {
    accountRepository.findAccountByAmazonId(amazonId)
      .then((account) => {
        if (!account) {
          reject('Cannot edit child, account does not exist.');
        } else {
          childrenRepository.findOneByIdAmazonId(data.child, amazonId)
          .then((child) => {
            if (!child) {
              reject('Child doesn\'t exist.');
            } else {
              child.updateAttributes(data.child)
              .on('success', resolve('Child updated successfully.'))
              .on('error', reject('Error updating child.'));
            }
          });
        }
      });
  }),

  /**
    * @function updateChild
    * @param {object} data - Contains an account
    * @param {object} data.account - Contains amazonId
    * @param {string} amazonId
    * @param {object} data.child - MUST contains ORIGINAL child name
    * @param {string} data.child.name - MUST be ORIGINAL child name
    * @param {string} data.updatedChild.name - Child's updated name
    * @param {string} data.updatedChild.phone - Child's updated name
    * @returns {promise}
  */
  deleteChild: (data, amazonId) =>
  new Promise((resolve, reject) => {
    accountRepository.findAccountByAmazonId(amazonId)
      .then((account) => {
        if (!account) {
          reject('Cannot delete child, account does not exist.');
        } else {
          childrenRepository.findOneByIdAmazonId(data.child, amazonId)
          .then((child) => {
            console.log(child);
            if (!child) {
              reject('Cannot delete child, child does not exist.');
            } else {
              childrenRepository.destroy(child)
              .then(status => resolve(status))
              .catch(err => reject(err));
            }
          });
        }
      });
  }),

};

export default childrenServices;
