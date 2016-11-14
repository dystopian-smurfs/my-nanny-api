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
          username: 'Test',
          amazonId: '9999',
          timeZone: 'EST',
          phone: '1234567890',
          email: 'test@example.com',
        },
      },
    }, () => {
      // Now if we look in the database, we should find the
      // new Account there.
      const queryString = 'SELECT * FROM accounts';
      const queryArgs = [];

      dbConnection.query(queryString, queryArgs, (err, results) => {
        // Should have one result:
        expect(results.length).to.equal(1);

        expect(results[0].username).to.equal('Test');

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
          username: 'Test',
          amazonId: '9999',
          timeZone: 'EST',
          phone: '1234567890',
          email: 'test@example.com',
        },
      },
    }, () => {
      // Now if we look in the database, we should find the
      // new Account there.
      const queryString = 'SELECT * FROM accounts';
      const queryArgs = [];

      dbConnection.query(queryString, queryArgs, (err, results) => {
        // Should have one result:
        expect(results.length).to.equal(1);

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
          name: 'Johnny',
          phone: '1112223333',
        },
      },
    }, () => {
      // Now if we look in the database, we should find the
      // child tied to amazonId 9999
      const queryString = 'SELECT * FROM children LEFT JOIN accounts ON children.accountId = accounts.id WHERE accounts.amazonId = 9999';
      const queryArgs = [];

      dbConnection.query(queryString, queryArgs, (err, results) => {
        // Should have one result:
        expect(results.length).to.equal(1);
        expect(results[0].name).to.equal('Johnny');

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
          name: 'Johnny',
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


});
