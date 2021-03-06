import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import connect from './connect';

const app: Application = express();
const serverPort = 8080;
const db = 'mongodb://localhost:27017/mongodb-nodejs';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.get('/', (req: Request, res: Response) =>
  res.send('Welcome to the app start page')
);

app.listen(serverPort, () =>
  console.log(`Server started on http://localhost:${serverPort} .`)
);

connect({db});
routes({ app });