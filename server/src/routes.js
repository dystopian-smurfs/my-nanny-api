import ChoresController from './controllers/ChoresController';
import UserController from './controllers/UserController';
/** * @namespace API: Auth */
/** * @namespace API: Account */
/** * @namespace API: Children */
/** * @namespace API: Chores */
const routes = (app) => {
  /* /////// DOCS //////// */
  app.get('/', (req, res) => res.render('index', { title: 'my-nanny docs' }));

  /* /////// AUTH //////// */

  /**
    * @event /login
    * @memberOf API: Auth
    * @desc POST
    * @prop {object} data - Contains "account" obj
    * @prop {object} data.account
    * @prop {string} data.account.amazonId
  */
  app.post('/login', UserController.login);

  /**
    * @event /logout
    * @memberOf API: Auth
    * @desc POST
  */
  app.post('/logout', UserController.logout);

  /**
    * @event /signup
    * @memberOf API: Auth
    * @desc POST
    * @prop {object} data - An object with new account info
    * @prop {string} data.account.username
    * @prop {string} data.account.token - The token given my Amazon's OAuth
    * @prop {string} data.account.amazonId - The account's Amazon Id
    * @prop {string} data.account.timeZone - See momentjs for formats
    * @prop {object} data.account.phone - Ex: "111222333"
    * @prop {object} data.account.email - Ex: "nanny@example.com"
  */
  app.post('/signup', UserController.signup);

  /* /////// ACCOUNT /////// */
  /**
    * @event /api/account
    * @memberOf API: Account
    * @desc PUT
    * @param {object} data - Contains an account
    * @param {object} data.account - Contains amazonId
    * @param {string} data.account.amazonId
    * @param {object} data.updatedAccount
    * @param {string} data.updatedAccount.username
    * @param {string} data.updatedAccount.token - The token given my Amazon's OAuth
    * @param {string} data.updatedAccount.amazonId - The updatedAccount's Amazon Id
    * @param {string} data.updatedAccount.timeZone
    * @param {object} data.updatedAccount.phone
    * @param {object} data.updatedAccount.email
  */
  app.put('/api/account', UserController.updateAccount);

  /* /////// CHILDREN /////// */
  /**
    * @event /api/children
    * @memberOf API: Children
    * @desc POST
    * @param {object} data - Contains separate account and child objects
    * @param {object} data.account - Contains a account's info
    * @param {string} data.account.amazonId
    * @param {object} data.child - The child
    * @param {string} data.child.name
    * @param {string} data.child.phone
  */
  app.post('/api/children', UserController.addChild);

  /**
    * @event /api/children
    * @memberOf API: Children
    * @desc PUT
    * @param {object} data - Contains an account
    * @param {object} data.account - Contains amazonId
    * @param {string} data.account.amazonId
    * @param {object} data.child - MUST contains ORIGINAL child name
    * @param {string} data.child.name - MUST be ORIGINAL child name
    * @param {string} data.updatedChild.name - Child's updated name
    * @param {string} data.updatedChild.phone - Child's updated name
  */
  app.put('/api/children', UserController.updateChild);

  /* /////// CHORES //////// */
  app.get('/api/chores', ChoresController.readAll);
  app.get('/api/chores/:id', ChoresController.read);
  app.post('/api/chores', ChoresController.create);
  app.put('/api/chores', ChoresController.update);
  app.delete('/api/chores/:id', ChoresController.destroy);
};

export default routes;
