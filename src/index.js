// use "import" to import libraries
import express from 'express';
import superAdminRoutes from './resources/super-admins';
import adminsRoutes from './resources/admins';

// use "require" to import JSON files

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use('/super-admins', superAdminRoutes);

app.use('/admins', adminsRoutes);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
