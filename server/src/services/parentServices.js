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

/** @module Services: Parent */
const parentServices = {
  /**
    * @function findAccountByAmazonId
    * @param {string} amazonId - The amazonId of the parent
   */
  findAccountByAmazonId: amazonId =>
    Parent.findOne({ where: { amazonId } }),

  /**
    * @function findAccountByEmail
    * @param {string} email - The email of the parent
   */
  findAccountByEmail: email =>
    Parent.findOne({ where: { email } }),

  /**
    * @function findAccountByPhone
    * @param {string} phone - The phone number of the parent
   */
  findAccountByPhone: phone =>
    Parent.findOne({ where: { phone } }),

  /**
    * @function findAccountByUsername
    * @param {string} username - The username of the parent
  */
  findAccountByUsername: username =>
    Parent.findOne({ where: { username } }),

};

export default parentServices;
