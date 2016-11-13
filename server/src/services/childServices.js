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

/** @module Services: Child */
const childServices = {
  /**
    * @function findAccountByAmazonId
    * @desc Finds all children of a parent based on their name
    * @param {object} child
    * @param {string} child.name
    * @param {string} amazonId - The amazonId of the parent
    * @returns {promise} promise - Resolves to array of children or []
   */
  findOneByAmazonId: ({ name }, amazonId) =>
    new Promise((resolve) => {
      Parent.findOne({
        where: {
          amazonId,
        },
        include: [{
          model: Child,
          where: {
            name,
          },
        }],
      })
      .then((foundParent) => {
        console.log('FOUND Parent: ', foundParent);
        if (foundParent) {
          resolve(foundParent.children);
        } else {
          resolve([]);
        }
      })
      .catch(err => console.log(err));
    }),

  /**
    * @function findAccountByEmail
    * @param {string} email
   */
  findAccountByEmail: email =>
    Child.findOne({ where: { email } }),

  /**
    * @function findAccountByPhone
    * @param {string} phone
   */
  findAccountByPhone: phone =>
    Child.findOne({ where: { phone } }),
};

export default childServices;
