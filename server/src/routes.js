import ChoresController from './controllers/ChoresController';
import UserController from './controllers/UserController';

const routes = (app) => {
  /* /////// DOCS //////// */
  app.get('/', (req, res) => res.render('index', { title: 'my-nanny docs' }));

  /* /////// USERS //////// */
  app.post('/login', UserController.login);
  app.post('/logout', UserController.logout);
  app.post('/signup', UserController.signup);

  /* /////// CHORES //////// */
  app.get('/api/chores', ChoresController.readAll);
  app.get('/api/chores/:id', ChoresController.read);
  app.post('/api/chores', ChoresController.create);
  app.put('/api/chores', ChoresController.update);
  app.delete('/api/chores/:id', ChoresController.destroy);
};

export default routes;
