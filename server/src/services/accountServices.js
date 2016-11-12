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

/** @module Services: Account */
const accountServices = {
  /**
    * @function createNewAccount
    * @param {object} data - An object with new parent info
    * @param {string} data.username
    * @param {string} data.token - The token given my Amazon's OAuth
    * @param {string} data.amazonId - The parent's Amazon Id
    * @param {string} data.timeZone
    * @param {object} data.phone
    * @param {object} data.email
   */
  createNewAccount: (data, cb) => {
    parentServices.findAccountByAmazonId(data.amazonId)
    .then((parent) => {
      if (parent) {
        // If parent exists already, return an error
        cb('Failed to create account.');
      } else {
        const newParent = parentRepository.create(data);
        newParent.save();
        cb('Successfully created account.');
      }
    });
  },
  /**
    * @function login
    * @param {object} data - Contains a parent/user login
    * @param {string} data.username
    * @param {string} data.amazonId
  */
  login: (data, cb) => {
    parentServices.findAccountByAmazonId(data.amazonId)
    .then((parent) => {
      if (parent) {
        // If parent exists, login
        cb('Successfully logged in.');
      } else {
        cb('Failed to log in.');
      }
    });
  },


};

export default accountServices;
