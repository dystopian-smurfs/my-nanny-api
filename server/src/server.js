import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import routes from './routes';
// These imports start the connection and model relationships
import connection from './connection';
import initializeSchemas from './initializeSchemas';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'docs/public')));

routes(app);

const port = process.env.devPort || 1337;
console.log(`server is listening on port ${port}`);

app.listen(port);

export default app;
