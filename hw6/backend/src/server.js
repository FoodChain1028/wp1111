import express from 'express';
import cors from 'cors';
import routes from './routes';
import db from './db';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  console.log(res)
  res.send('Hello, World!');
});
app.listen(port, () =>
 console.log(`Example app listening on port ${port}!`),
);

//connect db
db.connect();

app.use('/', routes);
