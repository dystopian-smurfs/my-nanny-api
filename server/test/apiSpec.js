/* global define, it, describe, beforeEach, afterEach, done  */
/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */
import sinon from 'sinon';
// import mysql from 'mysql';
import request from 'request';
import chai from 'chai';
import config from '../src/config';

const mock = sinon.mock(require('mysql'));
mock.expects('query').with(queryString, queryParams).yields(null, rows);

const expect = chai.expect;

describe('My-Nanny API', () => {
  let dbConnection;

  beforeEach((done) => {
    dbConnection = mysql.createConnection({
      user: config.username,
      password: config.password,
    });

    dbConnection.connect();

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    // dbConnection.query(`TRUNCATE ${tablename}`, done);
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
          amazonId: '98317423984',
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
        // console.log('Got to the DB query', results);
        expect(results.length).to.equal(1);

        expect(results[0].username).to.equal('Test');

        done();
      });
    });
  });
});

// describe('My-Nanny API', function() {
//   var dbConnection;

  // beforeEach(function(done) {
  //   dbConnection = mysql.createConnection({
  //     user: 'root',
  //     password: '',
  //     database: 'chat'
  //   });
  //   dbConnection.connect();

  //   var tablename = 'Messages';

  //   /* Empty the db table before each test so that multiple tests
  //    * (or repeated runs of the tests) won't screw each other up: */
  //   dbConnection.query('truncate ' + tablename, done);
  // });

//   afterEach(function() {
//     dbConnection.end();
//   });

//   it('Should insert posted messages to the DB', function(done) {
//     // Post the user to the chat server.
//     request({
//       method: 'POST',
//       uri: 'http://127.0.0.1:3000/classes/users',
//       json: { username: 'Javert' }
//     }, function () {
//       // Post a message to the node chat server:
//       request({
//         method: 'POST',
//         uri: 'http://127.0.0.1:3000/classes/messages',
//         json: {
//           username: 'Valjean',
//           text: 'In mercy\'s name, three days is all I need.',
//           roomname: 'Hello'
//         }
//       }, function () {
//         // Now if we look in the database, we should find the
//         // posted message there.

//         var queryString = 'SELECT * FROM messages';
//         var queryArgs = [];

//         dbConnection.query(queryString, queryArgs, function(err, results) {
//           // Should have one result:
//           expect(results.length).to.equal(1);

//           expect(results[0].text).to.equal('In mercy\'s name, three days is all I need.');

//           done();
//         });
//       });
//     });
//   });

//   it('Should insert posted users to the DB', function(done) {
//     request({
//       method: 'POST',
//       uri: 'http://127.0.0.1:3000/classes/users',
//       json: { username: 'Batman' }
//     }, function () {
//       // Now if we look in the database, we should find the
//       // posted user there.

//       var queryString = 'SELECT * FROM users';
//       var queryArgs = [];

//       dbConnection.query(queryString, queryArgs, function(err, results) {
//         expect(results.length).to.equal(4);
//         expect(results[2].username).to.equal('Batman');

//         done();
//       });
//     });
//   });

//   it('Should output all messages from the DB', function(done) {
//     // Let's insert a message into the db
//     var queryString = 'INSERT INTO messages (text, roomname, user_id)\
//                         VALUES ("Men like you can never change!", "main", 1)';
//     var queryArgs = [];

//     dbConnection.query(queryString, queryArgs, function(err) {
//       if (err) { throw err; }

//       // Now query the Node chat server and see if it returns
//       // the message we just inserted:
//       request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
//         var messageLog = JSON.parse(body).results;
//         expect(messageLog[0].text).to.equal('Men like you can never change!');
//         expect(messageLog[0].roomname).to.equal('main');
//         done();
//       });
//     });
//   });


//   it('Should include roomname in returned messages', function(done) {
//     request({
//       method: 'POST',
//       uri: 'http://127.0.0.1:3000/classes/messages',
//       json: { username: 'Batman', text: 'I am your worst nightmare', roomname: 'Batcave' }
//     }, function () {
//       var queryString = 'SELECT roomname FROM messages WHERE roomname = "Batcave"';
//       var queryArgs = [];

//       dbConnection.query(queryString, queryArgs, function(err, results) {
//         expect(results.length).to.equal(1);
//         expect(results[0].roomname).to.equal('Batcave');

//         done();
//       });
//     });
//   });
// });