import { StatusCodes } from 'http-status-codes';
import { fileURLToPath } from 'url';
import p, { dirname } from 'path';
import fs from 'fs/promises';
import validator from 'validator';
import { Types } from 'mongoose';
import { User } from './index.js';
import { BadRequestError, NotFoundError } from '../error/error.js';
import {
  createToken,
  attachLoginCookie,
  attachLogoutCookie,
  sortQuery,
  pageQuery,
  searchQuery,
  rangeDatesQuery,
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
      let v = Number(data.avatar.split('avatar')[1].split('.')[0]);
      v = isNaN(v) ? 0 : v;
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

  if (data.role === 'admin')
    throw new BadRequestError('You can not delete an admin account');

  await data.delete();

  await fs.rm(p.join(__dirname, `${staticFolder}/${data._id}`), {
    recursive: true,
    force: true,
  });

  attachLogoutCookie({ res });
  res.status(StatusCodes.OK).json({ success: true, data: { _id: data._id } });
}

async function banUser(req, res) {
  const { id } = req.params;
  const searchField = validator.isMongoId(id) ? '_id' : 'username';

  const data = await User.findOne({ [searchField]: id });

  if (!data) throw new NotFoundError(`Username '${id}' does not exist`);

  if (data.role === 'admin')
    throw new BadRequestError('You can not ban an admin user');

  data.set({ enabled: false });
  await data.save();

  res.status(StatusCodes.OK).json({ success: true, data: { _id: data._id } });
}

async function unbanUser(req, res) {
  const { id } = req.params;
  const searchField = validator.isMongoId(id) ? '_id' : 'username';

  const data = await User.findOne({ [searchField]: id });

  if (!data) throw new NotFoundError(`Username '${id}' does not exist`);

  data.set({ enabled: true });
  await data.save();

  res.status(StatusCodes.OK).json({ success: true, data: { _id: data._id } });
}

async function followUser(req, res) {
  const { id } = req.params;
  const searchField = validator.isMongoId(id) ? '_id' : 'username';
  const isEnabled = { enabled: true };
  const isAdmin = { enabled: req.user.role !== 'admin' };

  if (id === req.user.username || id === req.user.userId)
    throw new BadRequestError('You can not follow yourself');

  const follow = await User.findOne({
    [searchField]: id,
    $or: [isEnabled, isAdmin],
  });

  if (!follow) throw new NotFoundError(`User ${id} does not exists`);

  const user = await User.findOne({ username: req.user.username });

  const indexUser = user.follows.findIndex((f) => f._id.equals(follow._id));
  if (indexUser !== -1)
    throw new BadRequestError(`You are already following user ${id}`);

  user.follows.push(follow._id);
  await user.save({ timestamps: false });

  follow.followers.push(user._id);
  await follow.save({ timestamps: false });

  res.status(StatusCodes.OK).json({ success: true, data: { _id: user._id } });
}

async function unfollowUser(req, res) {
  const { id } = req.params;
  const searchField = validator.isMongoId(id) ? '_id' : 'username';
  const isEnabled = { enabled: true };
  const isAdmin = { enabled: req.user.role !== 'admin' };

  const user = await User.findOne({ username: req.user.username });
  const follow = await User.findOne({
    [searchField]: id,
    $or: [isEnabled, isAdmin],
  });

  if (!follow) throw new NotFoundError(`User ${id} does not exists`);

  const indexUser = user.follows.findIndex((f) => f._id.equals(follow._id));
  if (indexUser === -1)
    throw new BadRequestError(`You are not following user ${id}`);

  user.follows.splice(indexUser, 1);
  await user.save({ timestamps: false });

  const indexFol = follow.followers.findIndex((u) => u._id == req.user.userId);

  follow.followers.splice(indexFol, 1);
  await follow.save({ timestamps: false });

  res.status(StatusCodes.OK).json({ success: true, data: { _id: user._id } });
}

async function getAllUsers(req, res) {
  const { after, before, sort, page, q } = req.query;
  const pageSize = 9;

  const orderQuery = sortQuery({
    sort,
    fields: ['username'],
    defaultSort: { username: 1 },
  });

  const skipQuery = pageQuery({ page, pageSize });

  let filterQuery = searchQuery({ filter: {}, fields: ['username'], q });
  filterQuery = rangeDatesQuery({
    filter: filterQuery,
    field: 'createdAt',
    start: after,
    end: before,
  });

  const data = await User.find(
    filterQuery,
    { username: 1, email: 1, role: 1, avatar: 1, enabled: 1 },
    { sort: orderQuery, limit: pageSize, skip: skipQuery }
  );

  res.status(StatusCodes.OK).json({ success: true, data });
}

async function getAllFollows(req, res) {
  const { sort, page, q } = req.query;
  const pageSize = 9;

  const orderQuery = sortQuery({
    sort,
    fields: ['username'],
    defaultSort: { username: 1 },
  });

  const skipQuery = pageQuery({ page, pageSize });

  let matchQuery = { enabled: true };
  matchQuery = searchQuery({ filter: matchQuery, fields: ['username'], q });

  let data = await User.lookup({
    filter: { username: req.user.username },
    project: { follows: 1 },
    populate: {
      path: 'follows',
      select: { username: 1, avatar: 1 },
      match: matchQuery,
      options: { sort: orderQuery, limit: pageSize, skip: skipQuery },
    },
  });

  if (data.length > 0) data = data[0].follows;
  res.status(StatusCodes.OK).json({ success: true, data });
}

async function getUserProfile(req, res) {
  const { id } = req.params;
  const { username, role } = req.user;

  const isId = validator.isMongoId(id);
  const searchField = isId ? '_id' : 'username';
  const idField = isId ? Types.ObjectId(id) : id;

  const isEnabled = { enabled: true };
  const isAdmin = { enabled: role !== 'admin' };
  const isSelf = { username: username };

  const data = (
    await User.aggregate([
      {
        $match: {
          [searchField]: idField,
          $or: [isEnabled, isSelf, isAdmin],
        },
      },
      {
        $lookup: {
          from: 'publications',
          localField: '_id',
          foreignField: 'user',
          as: 'publications',
        },
      },
      {
        $lookup: {
          from: 'users',
          as: 'follows',
          let: { follows: '$follows' },
          pipeline: [
            {
              $match: {
                $or: [isEnabled, isSelf],
                $expr: { $in: ['$_id', '$$follows'] },
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'users',
          as: 'followers',
          let: { followers: '$followers' },
          pipeline: [
            {
              $match: {
                $or: [isEnabled, isSelf],
                $expr: { $in: ['$_id', '$$followers'] },
              },
            },
          ],
        },
      },
      {
        $project: {
          username: 1,
          avatar: 1,
          numPublications: { $size: '$publications' },
          numFollows: { $size: '$follows' },
          numFollowers: { $size: '$followers' },
        },
      },
    ])
  )[0];

  if (!data) throw new NotFoundError(`Username '${id}' does not exist`);

  const currentUser = await User.findOne({ username: username });
  data.isFollowing = await currentUser.isFollowing(data._id);

  res.status(StatusCodes.OK).json({ success: true, data });
}

async function getAllPublicationsByUser(req, res) {
  const { id } = req.params;
  const { after, before, sort, page } = req.query;
  const { username, role } = req.user;
  const isAdmin = role !== 'admin';
  const pageSize = 9;
  const searchField = validator.isMongoId(id) ? '_id' : 'username';

  const orderQuery = sortQuery({
    sort,
    fields: ['createdAt', 'updatedAt'],
    defaultSort: { updatedAt: -1 },
  });

  const skipQuery = pageQuery({ page, pageSize });

  const matchFilter = rangeDatesQuery({
    filter: {},
    field: 'updatedAt',
    start: after,
    end: before,
  });

  const data = await User.findOne(
    {
      [searchField]: id,
      $or: [{ enabled: true }, { enabled: isAdmin }, { username: username }],
    },
    { _id: 1 }
  ).populate({
    path: 'publications',
    match: matchFilter,
    select: { title: 1, images: { $slice: 1 } },
    options: { sort: orderQuery, limit: pageSize, skip: skipQuery },
    populate: { path: 'user', select: { username: 1, avatar: 1 } },
  });

  if (!data) throw new NotFoundError(`Username '${id}' does not exist`);

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
  getAllUsers,
  banUser,
  unbanUser,
  getAllFollows,
  unfollowUser,
  followUser,
};
