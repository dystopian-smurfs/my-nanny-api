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
const schedlueServices = {
  read: data => null,

  /**
    * @function create
    * @param {object} data - Contains separate account and child objects
    * @param {object} data.account - Contains a account's info
    * @param {string} data.account.amazonId
    * @param {object} data.child
    * @param {string} data.child.name
    * @param {object} data.schedule
    * @param {string} data.schedule.defaultCurfews - Sunday to Saturday [null, "18:30", "14:30", "17:00", "22:00", "17:00", null]
    * @returns {promise}
  */
  create: data =>
    new Promise((resolve, reject) => {
      // Check if the account exists
      accountRepository.findAccountByAmazonId(data.account.amazonId)
      .then((account) => {
        if (!account) {
          reject('Cannot add schedule, account does not exist.');
        } else {
          // Check if the child exists
          childrenRepository.findOneByIdAmazonId(data.child, data.account.amazonId)
          .then((child) => {
            if (!child) {
              reject('Cannot add schedule, child does not exist.');
            } else {
              // Get the schedule and the child
              scheduleRepository.findScheduleIfExists(data.child, data.account.amazonId)
              .then((schedule) => {
                if (schedule) {
                  reject('Schedule already exists, please PUT to update a schedule');
                } else {
                  const newSchedule = scheduleRepository.create(data.schedule, child);
                  newSchedule.save()
                  .then(() => child.setSchedule(newSchedule))
                  .then(() => resolve('Successfully added schedule.'));
                }
              });
            }
          });
        }
      });
    }),

  update: data =>
    new Promise((resolve, reject) => {
      // Check if the account exists
      accountRepository.findAccountByAmazonId(data.account.amazonId)
      .then((account) => {
        if (!account) {
          reject('Cannot update schedule, account does not exist.');
        } else {
          // Check if the child exists
          childrenRepository.findOneByIdAmazonId(data.child, data.account.amazonId)
          .then((child) => {
            if (!child) {
              reject('Cannot update schedule, child does not exist');
            } else {
              scheduleRepository.findScheduleIfExists(data.child, data.account.amazonId)
              .then((schedule) => {
                if (!schedule) {
                  reject('Cannot update schedule, schedule does not exist.');
                } else {
                  scheduleRepository.update(schedule, data.schedule)
                  .then(() => resolve('Successfully updated schedule.'));
                }
              });
            }
          });
        }
      });
    }),

  destroy: data => null,

};

export default schedlueServices;
