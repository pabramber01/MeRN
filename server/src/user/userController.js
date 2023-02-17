import { StatusCodes } from 'http-status-codes';
import { User } from './index.js';
import {
  createToken,
  attachLoginCookie,
  sortQuery,
  pageQuery,
} from '../utils/index.js';
import validator from 'validator';
import { BadRequestError } from '../error/error.js';

async function createUser(req, res) {
  const { username, email, password } = req.body;

  const user = await User.create({ username, email, password });

  const userToken = createToken(user);
  attachLoginCookie({ res, userToken });
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, data: { user: userToken } });
}

async function getUserProfile(req, res) {
  const { id } = req.params;
  const searchField = validator.isMongoId(id) ? '_id' : 'username';

  const data = await User.findOne(
    { [searchField]: id },
    { _id: 0, username: 1, avatar: 1 }
  );

  if (!data) throw new BadRequestError(`Username '${id}' does not exist`);

  res.status(StatusCodes.OK).json({ success: true, data });
}

async function getAllPublicationsByUser(req, res) {
  const { id } = req.params;
  const { sort, page } = req.query;
  const pageSize = 9;
  const searchField = validator.isMongoId(id) ? '_id' : 'username';

  const orderQuery = sortQuery({
    sort,
    fields: ['createdAt', 'updatedAt'],
    defaultSort: { updatedAt: -1 },
  });

  const skipQuery = pageQuery({ page, pageSize });

  const data = await User.findOne({ [searchField]: id }, { _id: 1 }).populate({
    path: 'publications',
    select: { title: 1, images: { $slice: 1 } },
    options: { sort: orderQuery, limit: pageSize, skip: skipQuery },
    populate: { path: 'user', select: { username: 1, avatar: 1 } },
  });

  if (!data) throw new BadRequestError(`Username '${id}' does not exist`);

  res.status(StatusCodes.OK).json({ success: true, data: data.publications });
}

export default { createUser, getUserProfile, getAllPublicationsByUser };
