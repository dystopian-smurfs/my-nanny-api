import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import routes from './routes';
import passport from 'passport';
import {Strategy} from 'passport-amazon';

// These imports start the connection and model relationships
import connection from './connection';
import initializeSchemas from './initializeSchemas';
import config from './config'

// PASSPORT
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new Strategy({
    clientID: config.amazonClientId,
    clientSecret: config.amazonClientSecret,
    callbackURL: 'http://127.0.0.1:' + config.port + '/login/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

// NODE EXPRESS
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST', 'DELETE']);
  next();
});

app.use(cookieParser());
app.use(session({ secret: 'my nanny is awesome' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'docs')));

routes(app, passport);

const port = process.env.devPort || config.port;
console.log(`server is listening on port ${port}`);

app.listen(port);


export default app;
