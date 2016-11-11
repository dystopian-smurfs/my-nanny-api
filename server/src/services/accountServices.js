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

/** @namespace accountServices */
const accountServices = {
  /**
    * @function createNewAccount
    * @memberof accountServices
    * @param {object} data - Contains a parent object and an array of children objects.
    * @param {object} data.parent - The parent object to be created.
    * @param {number} data.parent.householdName - The householdName for the account.
    * @param {string} data.parent.token - The token given my Amazon's OAuth.
    * @param {string} data.parent.amazonId - The parent's Amazon Id.
    * @param {number} data.parent.timeZone - What time zone the parent is in.
    * @param {object} data.parent.phone - The parent's phone number.
    * @param {object} data.parent.email - The parent's email.
    * @param {object} data.children - An array of children to be created for the Parent.
    * @param {object} data.children.child.name - The child's first name.
    * @param {object} data.children.child.phone - The child's phone number.
   */
  createNewAccount: (data) => {
    // Check if alexa account exists
    const parent = parentServices.findAccountByAmazonId(data.amazonId);
    if (!parent) {
      // If parent does exist, return an error
    } else {
      const newParent = parentRepository.create(data);
      newParent.save();
      // Create as many children as the data.children array has
      const children = data.children.map(child => childRepository.create(child));
      children.forEach((child) => {
        newParent.setChild(child);
        child.save();
      });
    }
  },


};

export default accountServices;
