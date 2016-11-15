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
          childrenRepository.findOneByAmazonId(data.child, data.account.amazonId)
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
          childrenRepository.findOneByAmazonId(data.child, data.account.amazonId)
          .then((child) => {
            if (!child) {
              reject('Child doesn\'t exist.');
            } else {
              // Check if another child is already called what you passed in as name
              childrenRepository.findOneByAmazonId(data.updatedChild, data.account.amazonId)
              .then((duplicateChild) => {
                if (duplicateChild) {
                  reject('Another child is already named what you tried to update this child');
                } else {
                  child.updateAttributes(data.updatedChild)
                  .on('success', resolve('Child updated successfully.'))
                  .on('error', reject('Error updating child.'));
                }
              });
            }
          });
        }
      });
  }),

};

export default childrenServices;
