// use "import" to import libraries
import express from 'express';
import superAdminRoutes from './resources/super-admins';

// use "require" to import JSON files
const admins = require('./data/admins.json');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use('/super-admins', superAdminRoutes);

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
