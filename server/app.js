import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.all('*', (req, res) => {
  res.status(404).send('resource not found');
});

const port = 8000;

const start = async () => {
  try {
    await mongoose.connect('mongodb://mern:mern@127.0.0.1:27017/merndb');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();