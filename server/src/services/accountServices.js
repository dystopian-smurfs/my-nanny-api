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
    * @memberof accountServices
    * @param {object} data - Contains a parent object and an array of children objects
    * @param {object} data.parent - The parent object to be created
    * @param {string} data.parent.username
    * @param {string} data.parent.token - The token given my Amazon's OAuth
    * @param {string} data.parent.amazonId - The parent's Amazon Id
    * @param {string} data.parent.timeZone
    * @param {object} data.parent.phone
    * @param {object} data.parent.email
   */
  createNewAccount: (data, cb) => {
    // Check if alexa account exists
    parentServices.findAccountByAmazonId(data.amazonId)
    .then((parent) => {
      if (parent) {
        // If parent does exist, return an error
        cb('Failed to create account.');
      } else {
        const newParent = parentRepository.create(data);
        newParent.save();
        cb('Successfully created account.');
      }
    });
  },


};

export default accountServices;
