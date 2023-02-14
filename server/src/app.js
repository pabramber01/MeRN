import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './utils/index.js';
import { authRouter } from './auth/index.js';
import { userRouter } from './user/index.js';
import { publicationRouter } from './publication/index.js';
import {
  errorHandlerMiddleware,
  routeNotFoundMiddleware,
} from './error/index.js';

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static('./public'));

app.use(cors({ credentials: true, origin: process.env.FT_BASE_URL }));

app.use(morgan('common'));

app.use('/mern/v1/auth', authRouter);
app.use('/mern/v1/users', userRouter);
app.use('/mern/v1/publications', publicationRouter);

app.use(errorHandlerMiddleware);
app.use(routeNotFoundMiddleware);

const port = process.env.PORT;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
