import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import rateLimiter from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import { connectDB } from './utils/index.js';
import { authMiddleware, authRouter } from './auth/index.js';
import { userRouter } from './user/index.js';
import { publicationRouter } from './publication/index.js';
import { commentRouter } from './comment/index.js';
import {
  errorHandlerMiddleware,
  routeNotFoundMiddleware,
} from './error/index.js';

const app = express();

app.use(cors({ credentials: true, origin: process.env.FT_BASE_URL }));

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

const fileOptions = {
  createParentPath: true,
  defCharset: 'utf8',
  defParamCharset: 'utf8',
};
if (process.env.NODE_ENV === 'production') fileOptions['useTempFiles'] = true;
app.use(fileUpload(fileOptions));

app.use('/common/static', authMiddleware.isAuthenticated);
app.use('/common/static', express.static('./public/common'));

if (process.env.NODE_ENV !== 'production') {
  app.use('/mern/static', authMiddleware.isAuthenticated);
  app.use('/mern/static', express.static('./public/mern'));
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
}

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

if (process.env.NODE_ENV !== 'test') app.use(morgan('common'));

app.use('/mern/v1/auth', authRouter);
app.use('/mern/v1/users', userRouter);
app.use('/mern/v1/publications', publicationRouter);
app.use('/mern/v1/comments', commentRouter);

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

if (process.env.NODE_ENV !== 'test') start();

export default app;
