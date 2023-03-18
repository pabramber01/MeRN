import { StatusCodes } from 'http-status-codes';
import validator from 'validator';
import { fileURLToPath } from 'url';
import p, { dirname } from 'path';
import fs from 'fs/promises';
import { User } from './index.js';
import { BadRequestError } from '../error/error.js';
import {
  createToken,
  attachLoginCookie,
  attachLogoutCookie,
  sortQuery,
  pageQuery,
} from '../utils/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFolder = '../../public/mern/users';

async function createUser(req, res) {
  const { username, email, password } = req.body;

  const data = await User.create({ username, email, password });

  const userToken = createToken(data);
  attachLoginCookie({ res, userToken });
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, data: { user: userToken } });
}

async function getUserData(req, res) {
  const data = await User.findOne(
    { username: req.user.username },
    { username: 1, email: 1, avatar: 1 }
  );

  res.status(StatusCodes.OK).json({ success: true, data });
}

async function updateUser(req, res) {
  const { username, email, avatar } = req.body;

  const data = await User.findOne({ username: req.user.username });

  let img;
  let path = undefined;
  const oldPh = data.avatar.split('/').splice(-1)[0];
  if (avatar) {
    path = oldPh;
  } else {
    if (req.files) {
      img = req.files.avatar;

      const isImage = img && img.mimetype.startsWith('image');
      if (!isImage) throw new BadRequestError('You must only upload image');

      const fileName = img.name;
      const v = data.__v;
      path = `avatar${v + 1}${fileName.substr(fileName.lastIndexOf('.'))}`;
    }
  }

  data.set({ username, email, avatar: path });
  await data.save();

  const newAvatar = avatar ? false : true;
  if (newAvatar) {
    if (!oldPh.includes('default'))
      await fs.rm(p.join(__dirname, `${staticFolder}/${data._id}/${oldPh}`));
    if (path)
      await img.mv(p.join(__dirname, `${staticFolder}/${data._id}/${path}`));
  }

  const userToken = createToken(data);
  attachLoginCookie({ res, userToken });
  res.status(StatusCodes.OK).json({ success: true, data: { user: userToken } });
}

async function updatePassword(req, res) {
  const { oldPass, newPass } = req.body;

  const data = await User.findOne({ username: req.user.username });

  const passwordMatch = await data.checkPassword(oldPass);
  if (!passwordMatch) throw new BadRequestError('Invalid password');

  data.set({ password: newPass });
  await data.save();

  res.status(StatusCodes.OK).json({ success: true, data: { _id: data._id } });
}

async function deleteUser(req, res) {
  const data = await User.findOne({ username: req.user.username });

  await data.delete();

  await fs.rm(p.join(__dirname, `${staticFolder}/${data._id}`), {
    recursive: true,
    force: true,
  });

  attachLogoutCookie({ res });
  res.status(StatusCodes.OK).json({ success: true, data: { _id: data._id } });
}

async function getUserProfile(req, res) {
  const { id } = req.params;
  const searchField = validator.isMongoId(id) ? '_id' : 'username';

  const data = await User.findOne(
    { [searchField]: id },
    { username: 1, avatar: 1 }
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

export default {
  createUser,
  getUserProfile,
  getAllPublicationsByUser,
  updatePassword,
  deleteUser,
  getUserData,
  updateUser,
};
