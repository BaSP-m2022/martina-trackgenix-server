// use "import" to import libraries
import express from 'express';
import mongoose from 'mongoose';
import router from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

mongoose.connect(
  'mongodb+srv://martinamoser:martinaBaSP@basp-database.bhpgy.mongodb.net/BaSP-database?retryWrites=true&w=majority',
  (error) => {
    if (error) {
    // eslint-disable-next-line no-console
      console.log(':círculo_rojo: Database error: ', error);
    } else {
    // eslint-disable-next-line no-console
      console.log(':círculo_verde_grande: Database connected');
    }
  },
);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
