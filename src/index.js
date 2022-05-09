// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const admins = require('./data/admins.json');
const timeSheetsURL = require('./resources/time-sheets');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/time-sheets', timeSheetsURL);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
