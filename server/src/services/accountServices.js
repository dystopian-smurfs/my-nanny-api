import Promise from 'bluebird';
import Parent from '../models/parentModel';
import Child from '../models/childModel';
import Chore from '../models/choreModel';
import Schedule from '../models/scheduleModel';
import Curfew from '../models/curfewModel';
import parentRepository from '../repositories/parentRepository';
import childRepository from '../repositories/childRepository';
import choreRepository from '../repositories/choreRepository';
import scheduleRepository from '../repositories/scheduleRepository';
import curfewRepository from '../repositories/curfewRepository';
import childServices from './childServices';
import parentServices from './parentServices';
import db from '../connection';

/** @module Services: Account */
const accountServices = {
  /**
    * @function createNewAccount
    * @param {object} data - An object with new parent info
    * @param {string} data.parent.username
    * @param {string} data.parent.token - The token given my Amazon's OAuth
    * @param {string} data.parent.amazonId - The parent's Amazon Id
    * @param {string} data.parent.timeZone
    * @param {object} data.parent.phone
    * @param {object} data.parent.email
    * @returns {promise}
   */
  createNewAccount: data =>
    new Promise((resolve, reject) => {
      parentServices.findAccountByAmazonId(data.parent.amazonId)
      .then((parent) => {
        if (parent) {
          // If parent exists already, return an error
          reject('Failed to create account.');
        } else {
          const newParent = parentRepository.create(data.parent);
          newParent.save();
          resolve('Successfully created account.');
        }
      });
    }),

  /**
    * @function login
    * @param {object} data - Contains a parent/user login
    * @param {string} data.parent.amazonId
    * @returns {promise}
  */
  login: data =>
    new Promise((resolve, reject) => {
      parentServices.findAccountByAmazonId(data.parent.amazonId)
      .then((parent) => {
        if (!parent) {
          // If parent does not exist, login
          reject('Failed to log in.');
        } else {
          resolve('Successfully logged in.');
        }
      });
    }),

  /**
    * @function addChild
    * @param {object} data - Contains separate parent and child objects
    * @param {object} data.parent - Contains a parent's info
    * @param {string} data.parent.amazonId
    * @param {object} data.child - The child
    * @returns {promise}
  */
  addChild: data =>
    new Promise((resolve, reject) => {
      parentServices.findAccountByAmazonId(data.parent.amazonId)
      .then((parent) => {
        if (!parent) {
          reject('Cannot add child, parent does not exist.');
        } else {
          childServices.findOneByAmazonId(data.child, data.parent.amazonId)
          .then((children) => {
            if (children.length) {
              reject('Child already exists');
            } else {
              const newChild = childRepository.create(parent, data.child);
              newChild.save();
              parent.addChild(newChild);
              resolve('Child successfully added.');
            }
          });
        }
      });
    }),

  /**
    * @function editChild
    * @param {object} data - Contains a parent
    * @param {object} data.parent - Contains amazonId
    * @param {object} data.parent.amazonId
    * @param {object} data.child - MUST contains ORIGINAL child name
    * @param {object} data.child.name - MUST contain ORIGINAL name
    * @param {object} data.updatedChild.name - Contains child's updated name
    * @param {object} data.updatedChild.phone - Contains child's updated name
    * @returns {promise}
  */
  editChild: data =>
  new Promise((resolve, reject) => {
    parentServices.findAccountByAmazonId(data.parent.amazonId)
      .then((parent) => {
        if (!parent) {
          reject('Cannot edit child, parent does not exist.');
        } else {
          childServices.findOneByAmazonId(data.child, data.parent.amazonId)
          .then((children) => {
            if (!children.length) {
              reject('Child doesn\'t exist');
            } else {
              // Check if another child is already called what you passed in as name
              childServices.findOneByAmazonId(data.updatedChild, data.parent.amazonId)
              .then((duplicateChildren) => {
                if (duplicateChildren.length) {
                  reject('Another child is already named what you tried to update this child');
                } else {
                  children[0].updateAttributes(data.updatedChild)
                  .on('success', resolve('Child updated successfully.'))
                  .on('error', reject('Error updating child'));
                }
              });
            }
          });
        }
      });
  }),

};

export default accountServices;
