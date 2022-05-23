import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const port = process.env.PORT || 3000;

mongoose.connect(
  'mongodb+srv://martinamoser:martinaBaSP@basp-database.bhpgy.mongodb.net/BaSP-database?retryWrites=true&w=majority',
  (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(':círculo_rojo: Database error: ', error);
    } else {
      // eslint-disable-next-line no-console
      console.log(':círculo_verde_grande: Database connected');
      app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Example app listening on port ${port}`);
      });
    }
  },
);
