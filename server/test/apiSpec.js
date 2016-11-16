/* global define, it, describe, before,  beforeEach, afterEach, done  */
/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */
import sinon from 'sinon';
import mysql from 'mysql';
import request from 'request';
import chai from 'chai';
import config from '../src/config';

const expect = chai.expect;

describe('My-Nanny API', () => {
  let dbConnection;

  before((done) => {
    // Before the whole run of tests
    dbConnection = mysql.createConnection({
      user: config.username,
      password: config.password,
    });

    dbConnection.connect();
    dbConnection.query('DROP DATABASE IF EXISTS chaitest');
    dbConnection.query('CREATE DATABASE IF NOT EXISTS chaitest');
    dbConnection.query('USE chaitest');
    done();
  });

  beforeEach((done) => {
    // Does NOT clean out the database after each test
    dbConnection = mysql.createConnection({
      user: config.username,
      password: config.password,
    });

    dbConnection.connect();
    // Does NOT clean out the database after each test
    dbConnection.query('CREATE DATABASE IF NOT EXISTS chaitest');
    dbConnection.query('USE chaitest');
    done();
  });

  afterEach(() => dbConnection.end());

  it('Should create Account entires in the db on POST to /signup', (done) => {
    // Post the user to /signup.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:1337/signup',
      json: {
        account: {
          token: '1234',
          username: 'John',
          amazonId: '9999',
          timeZone: 'EST',
          phone: '1234567890',
          email: 'john@example.com',
        },
      },
    }, () => {
      // Now if we look in the database, we should find the
      // new Account there.
      const queryString = 'SELECT * FROM accounts WHERE accounts.username = "John"';
      const queryArgs = [];

      dbConnection.query(queryString, queryArgs, (err, results) => {
        // Should have one result:
        expect(results.length).to.equal(1);

        expect(results[0].username).to.equal('John');
        expect(results[0].amazonId).to.equal('9999');

        done();
      });
    });
  });

  it('Should not allow duplicate accounts to be created based on amazonId', (done) => {
    // Post the user to /signup.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:1337/signup',
      json: {
        account: {
          token: '1234',
          username: 'John',
          amazonId: '9999',
          timeZone: 'EST',
          phone: '1234567890',
          email: 'john@example.com',
        },
      },
    }, () => {
      // Now if we look in the database, we should find only 1
      const queryString = 'SELECT * FROM accounts';
      const queryArgs = [];

      dbConnection.query(queryString, queryArgs, (err, results) => {
        // Should have one result:
        expect(results.length).to.equal(1);

        done();
      });
    });
  });

  it('Should create another Account entry in the db on POST to /signup', (done) => {
    // Post the user to /signup.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:1337/signup',
      json: {
        account: {
          token: '111',
          username: 'Mary',
          amazonId: '8888',
          timeZone: 'EST',
          phone: '0987654321',
          email: 'mary@example.com',
        },
      },
    }, () => {
      // Now if we look in the database, we should find the
      // new Account there.
      const queryString = 'SELECT * FROM accounts WHERE accounts.username = "Mary"';
      const queryArgs = [];

      dbConnection.query(queryString, queryArgs, (err, results) => {
        // Should have one result:
        expect(results.length).to.equal(1);

        expect(results[0].username).to.equal('Mary');
        expect(results[0].amazonId).to.equal('8888');

        done();
      });
    });
  });

  it('Should add a child to an account based on amazonId', (done) => {
    // Post the user to /signup.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:1337/api/children',
      json: {
        account: {
          amazonId: '9999',
        },
        child: {
          name: 'Little-John',
          phone: '1112223333',
        },
      },
    }, () => {
      // Now if we look in the database, we should find the
      // child tied to amazonId 9999
      const queryString = 'SELECT * FROM children LEFT JOIN accounts ON children.accountId = accounts.id WHERE accounts.amazonId = "9999"';
      const queryArgs = [];

      dbConnection.query(queryString, queryArgs, (err, results) => {
        // Should have one result:
        expect(results.length).to.equal(1);
        expect(results[0].name).to.equal('Little-John');

        done();
      });
    });
  });

  it('Should add another child to an account based on amazonId', (done) => {
    // Post the user to /signup.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:1337/api/children',
      json: {
        account: {
          amazonId: '8888',
        },
        child: {
          name: 'Little-Mary',
          phone: '0009998888',
        },
      },
    }, () => {
      // Now if we look in the database, we should find the
      // child tied to amazonId 9999
      const queryString = 'SELECT * FROM children LEFT JOIN accounts ON children.accountId = accounts.id WHERE accounts.amazonId = 8888';
      const queryArgs = [];

      dbConnection.query(queryString, queryArgs, (err, results) => {
        // Should have one result:
        expect(results.length).to.equal(1);
        expect(results[0].name).to.equal('Little-Mary');

        done();
      });
    });
  });

  it('Should not add a child with a duplicate name to an account based on amazonId', (done) => {
    // Post the user to /signup.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:1337/api/children',
      json: {
        account: {
          amazonId: '9999',
        },
        child: {
          name: 'Little-John',
          phone: '8889997777',
        },
      },
    }, () => {
      // Now if we look in the database, we should find the
      // that there is still only 1 child
      const queryString = 'SELECT * FROM children LEFT JOIN accounts ON children.accountId = accounts.id WHERE accounts.amazonId = 9999';
      const queryArgs = [];

      dbConnection.query(queryString, queryArgs, (err, results) => {
        // Should have one result:
        expect(results.length).to.equal(1);

        done();
      });
    });
  });

  it('Should add chores to a child based on their id and account amazonId', (done) => {
    // Post the user to /signup.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:1337/api/chores',
      json: {
        account: {
          amazonId: '9999',
        },
        child: {
          id: 1,
        },
        chores: [
          {
            title: 'Wash the dishes',
            details: 'With soap this time...',
            date: '2016-11-14',
          },
          {
            title: 'Mop the floor',
            details: 'The Fabuloso is under the sink',
            date: '2017-09-24',
          },
        ],
      },
    }, () => {
      // Now if we look in the database, we should find the
      // that there is still only 1 child
      const queryString = 'SELECT * FROM chores LEFT JOIN children ON chores.childId = children.id LEFT JOIN accounts ON children.accountId = accounts.id WHERE accounts.amazonId = 9999';
      // const queryString = 'SELECT * FROM chores';
      const queryArgs = [];

      dbConnection.query(queryString, queryArgs, (err, results) => {
        // Should have one result:
        // console.log('QUERY RESULTS', results);
        expect(results.length).to.equal(2);

        done();
      });
    });
  });

  it('Should add a schedule to a child based on amazonId and child name', (done) => {
    // Post the user to /signup.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:1337/api/schedule',
      json: {
        account: {
          amazonId: '9999',
        },
        child: {
          id: 1,
        },
        schedule: {
          dateOfLastCurfew: '2000-12-31',
          sunday: 'null',
          monday: '02:40',
          tuesday: '12:30',
          wednesday: '14:05',
          thursday: '18:30',
          friday: '14:00',
          saturday: 'null',
        },
      },
    }, () => {
      // Now if we look in the database, we should find the
      // that Little-John has a schedule with childId that matched his id
      const queryString = 'SELECT * FROM schedules LEFT JOIN children ON schedules.childId = children.id LEFT JOIN accounts ON children.accountId = accounts.id WHERE accounts.amazonId = 9999';
      // const queryString = 'SELECT * FROM chores';
      const queryArgs = [];

      dbConnection.query(queryString, queryArgs, (err, results) => {
        // Should have one result:
        // console.log('QUERY RESULTS', results);
        expect(results.length).to.equal(1);
        expect(results[0].childId).to.equal(1);
        expect(results[0].monday).to.equal('02:40');

        done();
      });
    });
  });

  it('Should not add a schedule entry if the account does not exist', (done) => {
    // Post the user to /signup.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:1337/api/schedule',
      json: {
        account: {
          amazonId: '92837401923874',
        },
        child: {
          id: 1,
        },
        schedule: {
          dateOfLastCurfew: '2000-12-31',
          sunday: 'null',
          monday: '02:40',
          tuesday: '12:30',
          wednesday: '14:05',
          thursday: '18:30',
          friday: '14:00',
          saturday: 'null',
        },
      },
    }, () => {
      // Now if we look in the database, we should find the
      // that Little-John has a schedule with childId that matched his id
      const queryString = 'SELECT * FROM schedules LEFT JOIN children ON schedules.childId = children.id LEFT JOIN accounts ON children.accountId = accounts.id WHERE accounts.amazonId = 9999';
      // const queryString = 'SELECT * FROM chores';
      const queryArgs = [];

      dbConnection.query(queryString, queryArgs, (err, results) => {
        // Should have one result:
        // console.log('QUERY RESULTS', results);
        expect(results.length).to.equal(1);
        expect(results[0].childId).to.equal(1);
        expect(results[0].monday).to.equal('02:40');

        done();
      });
    });
  });

  it('Should not add a schedule to a child if the account does not exist', (done) => {
    // Post the user to /signup.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:1337/api/schedule',
      json: {
        account: {
          amazonId: '9999',
        },
        child: {
          id: 1,
        },
        schedule: {
          dateOfLastCurfew: '2000-12-31',
          sunday: 'null',
          monday: 'null',
          tuesday: 'null',
          wednesday: '14:05',
          thursday: '18:30',
          friday: '14:00',
          saturday: 'null',
        },
      },
    }, () => {
      // Now if we look in the database, we should find the
      // that Little-John has a schedule with childId that matched his id
      const queryString = 'SELECT * FROM schedules LEFT JOIN children ON schedules.childId = children.id LEFT JOIN accounts ON children.accountId = accounts.id WHERE accounts.amazonId = 9999';
      // const queryString = 'SELECT * FROM chores';
      const queryArgs = [];

      dbConnection.query(queryString, queryArgs, (err, results) => {
        // Should have one result:
        // console.log('QUERY RESULTS', results);
        expect(results.length).to.equal(1);
        expect(results[0].childId).to.equal(1);
        // If this POST worked, it would make monday null
        // We want it to NOT do that
        expect(results[0].monday).to.equal('02:40');

        done();
      });
    });
  });


  it('Should not add a schedule entry if the account exists but the child doesnt', (done) => {
    // Post the user to /signup.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:1337/api/schedule',
      json: {
        account: {
          amazonId: '9999',
        },
        child: {
          id: 99999999,
        },
        schedule: {
          dateOfLastCurfew: '2000-12-31',
          sunday: 'null',
          monday: 'null',
          tuesday: 'null',
          wednesday: '14:05',
          thursday: '18:30',
          friday: '14:00',
          saturday: 'null',
        },
      },
    }, () => {
      // Now if we look in the database, we should find the
      // that Little-John has a schedule with childId that matched his id
      const queryString = 'SELECT * FROM schedules LEFT JOIN children ON schedules.childId = children.id LEFT JOIN accounts ON children.accountId = accounts.id WHERE accounts.amazonId = 9999';
      // const queryString = 'SELECT * FROM chores';
      const queryArgs = [];

      dbConnection.query(queryString, queryArgs, (err, results) => {
        // Should have one result:
        // console.log('QUERY RESULTS', results);
        expect(results.length).to.equal(1);
        done();
      });
    });
  });

  it('Should update a schedule with a PUT', (done) => {
    // Post the user to /signup.
    request({
      method: 'PUT',
      uri: 'http://127.0.0.1:1337/api/schedule',
      json: {
        account: {
          amazonId: '9999',
        },
        child: {
          id: 1,
        },
        schedule: {
          dateOfLastCurfew: '2000-12-31',
          sunday: 'null',
          monday: 'null',
          tuesday: 'null',
          wednesday: '14:05',
          thursday: '18:30',
          friday: '14:00',
          saturday: 'null',
        },
      },
    }, () => {
      // Now if we look in the database, we should find the
      // that Little-John has a schedule with childId that matched his id
      const queryString = 'SELECT * FROM schedules LEFT JOIN children ON schedules.childId = children.id LEFT JOIN accounts ON children.accountId = accounts.id WHERE accounts.amazonId = 9999';
      // const queryString = 'SELECT * FROM chores';
      const queryArgs = [];

      dbConnection.query(queryString, queryArgs, (err, results) => {
        // Should have one result:
        // console.log('QUERY RESULTS', results);
        expect(results.length).to.equal(1);
        expect(results[0].childId).to.equal(1);
        expect(results[0].monday).to.equal('null');

        done();
      });
    });
  });

  it('Should NOT update a schedule with a PUT if the child doesnt exist', (done) => {
    // Post the user to /signup.
    request({
      method: 'PUT',
      uri: 'http://127.0.0.1:1337/api/schedule',
      json: {
        account: {
          amazonId: '9999',
        },
        child: {
          id: 1032840912834,
        },
        schedule: {
          dateOfLastCurfew: '2000-12-31',
          sunday: 'null',
          monday: 'null',
          tuesday: 'null',
          wednesday: '14:05',
          thursday: '18:30',
          friday: 'null',
          saturday: 'null',
        },
      },
    }, () => {
      // Now if we look in the database, we should find the
      // that Little-John has a schedule with childId that matched his id
      const queryString = 'SELECT * FROM schedules LEFT JOIN children ON schedules.childId = children.id LEFT JOIN accounts ON children.accountId = accounts.id WHERE accounts.amazonId = 9999';
      // const queryString = 'SELECT * FROM chores';
      const queryArgs = [];

      dbConnection.query(queryString, queryArgs, (err, results) => {
        // Should have one result:
        // console.log('QUERY RESULTS', results);
        expect(results.length).to.equal(1);
        expect(results[0].childId).to.equal(1);
        expect(results[0].friday).to.equal('14:00');

        done();
      });
    });
  });

  it('Should NOT update a schedule with a PUT if the account doesnt exist', (done) => {
    // Post the user to /signup.
    request({
      method: 'PUT',
      uri: 'http://127.0.0.1:1337/api/schedule',
      json: {
        account: {
          amazonId: '012394812039480129834',
        },
        child: {
          id: 1,
        },
        schedule: {
          dateOfLastCurfew: '2000-12-31',
          sunday: 'null',
          monday: 'null',
          tuesday: 'null',
          wednesday: '14:05',
          thursday: 'null',
          friday: '14:00',
          saturday: 'null',
        },
      },
    }, () => {
      // Now if we look in the database, we should find the
      // that Little-John has a schedule with childId that matched his id
      const queryString = 'SELECT * FROM schedules LEFT JOIN children ON schedules.childId = children.id LEFT JOIN accounts ON children.accountId = accounts.id WHERE accounts.amazonId = 9999';
      // const queryString = 'SELECT * FROM chores';
      const queryArgs = [];

      dbConnection.query(queryString, queryArgs, (err, results) => {
        // Should have one result:
        // console.log('QUERY RESULTS', results);
        expect(results.length).to.equal(1);
        expect(results[0].childId).to.equal(1);
        expect(results[0].thursday).to.equal('18:30');

        done();
      });
    });
  });

});
