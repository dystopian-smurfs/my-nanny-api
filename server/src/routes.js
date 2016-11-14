import ChoresController from './controllers/ChoresController';
import UserController from './controllers/UserController';
import ChildrenController from './controllers/ChildrenController';

const routes = (app) => {
  /* /////// DOCS //////// */
  app.get('/', (req, res) => res.render('index', { title: 'my-nanny docs' }));

  /* /////// AUTH //////// */

  /**
  * @api {post} /login Login
  * @apiGroup Auth
  *
  * @apiParamExample POST format:
  *     {
  *       "account": {
  *         "amazonId": "999888777666"
  *       }
  *     }
  *
  * @apiSuccess {String} Successfully logged in.
  *
  * @apiError Failed to log in.
  */
  app.post('/login', UserController.login);

  /**
  * @api {post} /logout Logout
  * @apiGroup Auth
  *
  *
  * @apiSuccess {String} Successfully logged out.
  *
  * @apiError Failed to log out.
  */
  app.post('/logout', UserController.logout);

  /**
  * @api {post} /signup Signup
  * @apiGroup Auth
  *
  * @apiParamExample POST format:
  *     {
  *       "account": {
  *         "token": "1234",
  *         "username": "Mary",
  *         "amazonId": "999888777666",
  *         "timeZone": "EST",
  *         "phone": "1234567890",
  *         "email": "mary@example.com"
  *       }
  *     }
  *
  * @apiSuccess {String} Account successfully created.
  *
  * @apiError Failed to create account.
  */
  app.post('/signup', UserController.signup);

  /* /////// ACCOUNT /////// */

  /**
  * @api {put} /api/account Update Account
  * @apiGroup Account
  *
  * @apiParamExample PUT format:
  *     {
  *       "account": {
  *         "amazonId": "999888777666"
  *       },
  *       "updatedAccount": {
  *         "username": "Mary",
  *         "timeZone": "EST",
  *         "phone": "9990009999",
  *         "email": "mary@anotherExample.com"
  *       }
  *     }
  *
  * @apiSuccess {String} Successfully updated account.
  *
  * @apiError Failed to update account.
  */
  app.put('/api/account', UserController.updateAccount);

  /* /////// CHILDREN /////// */

  /**
  * @api {post} /api/children Add Child to Account
  * @apiGroup Children
  *
  * @apiParamExample POST format:
  *     {
  *       "account": {
  *         "amazonId": "999888777666"
  *       },
  *       "child": {
  *         "name": "Winston",
  *         "phone": "8887776666"
  *       }
  *     }
  *
  * @apiSuccess {String} Successfully added child.
  *
  * @apiError Failed to add child.
  */
  app.post('/api/children', ChildrenController.addChild);

  /**
  * @api {put} /api/children Update a child
  * @apiGroup Children
  *
  * @apiParamExample PUT format:
  *     {
  *       "account": {
  *         "amazonId": "999888777666"
  *       },
  *       "child": {
  *         "name": "Winston"
  *       },
  *       "updatedChild": {
  *         "name": "Oliver",
  *         "phone": "2223334444"
  *       }
  *     }
  *
  * @apiSuccess {String} Successfully updated child.
  *
  * @apiError Failed to update child.
  */
  app.put('/api/children', ChildrenController.updateChild);

  /* /////// CHORES //////// */

  /**
  * @api {get} /api/chores Get all chores for a child
  * @apiGroup Chores
  *     {
  *       "account": {
  *         "amazonId": "999888777666"
  *       },
  *       "child": {
  *         "name": "Alfred"
  *       }
  *     }
  *
  */
  app.get('/api/chores', ChoresController.readAll);

  /**
  * @api {get} /api/chores/:id Get a specific chore?
  * @apiGroup Chores
  * @apiParamExample GET format:
  *     {
  *       "NOT SURE IF WE NEED THIS PATH": "LET ME KNOW"
  *     }
  *
  */
  app.get('/api/chores/:id', ChoresController.read);

  /**
  * @api {post} /api/chores Add Chores to a Child
  * @apiGroup Chores
  *
  * @apiParamExample POST format:
  *     {
  *       "account": {
  *         "amazonId": "999888777666"
  *       },
  *       "child": {
  *         "name": "Winston"
  *       },
  *       "chores": [
  *         { "title": "Clean your room",
  *           "details": "Please clean your room nice and neat. Vaccuum it too!",
  *           "date": "2016-12-24"
  *         },
  *         { "title": "Wash the dishes",
  *           "details": "Use the blue sponge under the sink.",
  *           "date": "2016-12-24"
  *         }
  *        ]
  *     }
  *
  * @apiSuccess {String} Successfully added chore.
  *
  * @apiError Failed to add chore.
  */
  app.post('/api/chores', ChoresController.create);

  /**
  * @api {post} /api/chores Add Chore to a Child
  * @apiGroup Chores
  */
  app.put('/api/chores', ChoresController.update);

  /**
  * @api {post} /api/chores Add Chore to a Child
  * @apiGroup Chores
  */
  app.delete('/api/chores/:id', ChoresController.destroy);
};

export default routes;
