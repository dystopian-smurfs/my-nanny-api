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

/** @namespace parentServices */
const parentServices = {
  /**
    * @function findAccountByAmazonId
    * @memberof parentServices
    * @param {string} amazonId - The amazonId of the parent.
   */
  findAccountByAmazonId: amazonId =>
    Parent.findOne({ where: { amazonId } }),
  /**
    * @function findAccountByEmail
    * @memberof parentServices
    * @param {string} email - The email of the parent.
   */
  findAccountByEmail: email =>
    Parent.findOne({ where: { email } }),
  /**
    * @function findAccountByPhone
    * @memberof parentServices
    * @param {number} phone - The phone of the parent.
   */
  findAccountByPhone: phone =>
    Parent.findOne({ where: { phone } }),
  

};

export default parentServices;
