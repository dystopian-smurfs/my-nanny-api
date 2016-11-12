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
   */
  createNewAccount: (data, cb) => {
    parentServices.findAccountByAmazonId(data.parent.amazonId)
    .then((parent) => {
      if (parent) {
        // If parent exists already, return an error
        cb('Failed to create account.');
      } else {
        const newParent = parentRepository.create(data.parent);
        newParent.save();
        cb('Successfully created account.');
      }
    });
  },

  /**
    * @function login
    * @param {object} data - Contains a parent/user login
    * @param {string} data.parent.amazonId
  */
  login: (data, cb) => {
    parentServices.findAccountByAmazonId(data.parent.amazonId)
    .then((parent) => {
      if (!parent) {
        // If parent does not exist, login
        cb('Failed to log in.');
      } else {
        cb('Successfully logged in.');
      }
    });
  },

  /**
    * @function addChild
    * @param {object} data - Contains a parent's amazonId
    * @param {string} data.amazonId
  */
  addChild: (data, cb) => {
    parentServices.findAccountByAmazonId(data.parent.amazonId)
    .then((parent) => {
      if (!parent) {
        // If parent does not exist
        cb('Cannot add child.');
      } else {
        const newChild = childRepository.create(data.child);
        newChild.save()
        .then(() => parent.addChild(newChild))
        .then(() => cb('Successfully added child.'));
      }
    });
  },


};

export default accountServices;
