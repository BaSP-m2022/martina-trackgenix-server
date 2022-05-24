import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const port = process.env.PORT || 3000;
const URL = process.env.DATABASE_URL;

mongoose.connect(URL, (error) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.log(':círculo_rojo: Database error: ', error);
  } else {
    // eslint-disable-next-line no-console
    console.log(':círculo_verde_grande: Database connected');
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
