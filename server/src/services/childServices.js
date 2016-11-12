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
    * @param {callback} cb - The callback to be done after the promise resolves
   */
  findAllByAmazonId: ({ name }, amazonId, cb) => {
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
      if (foundParent) {
        cb(foundParent.children);
      } else {
        cb([]);
      }
    });
  },

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
