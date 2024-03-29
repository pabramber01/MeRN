import { StatusCodes } from 'http-status-codes';
import validator from 'validator';
import { Types } from 'mongoose';
import { User, userService } from './index.js';
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

      const mb10 = 10 * 1024 * 1024;
      const isSmall = img && img.size < mb10;
      if (!isSmall) throw new BadRequestError('Avatar must be lower than 10MB');

      const fileName = img.name;
      const ranNum = Math.random().toString().split('.')[1];
      path = `avatar${ranNum}${fileName.substr(fileName.lastIndexOf('.'))}`;
    }
  }

  data.set({ username, email, avatar: path });
  await data.save();

  const newAvatar = avatar ? false : true;
  if (newAvatar) {
    if (!oldPh.includes('default')) {
      await userService.deleteAvatar({ data, oldPh });
    }
    if (path) {
      await userService.addAvatar({ img, data, path });
    }
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

  await userService.deleteAvatar({ data });

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

  await User.updateOne(
    { username: req.user.username },
    { $push: { follows: follow._id } },
    { timestamps: false }
  );

  await User.updateOne(
    { [searchField]: id },
    { $push: { followers: user._id } },
    { timestamps: false }
  );

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

  await User.updateOne(
    { username: req.user.username },
    { $pull: { follows: follow._id } },
    { timestamps: false }
  );

  await User.updateOne(
    { [searchField]: id },
    { $pull: { followers: req.user.userId } },
    { timestamps: false }
  );

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

  const collation = { locale: 'en' };

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
    { sort: orderQuery, limit: pageSize, skip: skipQuery, collation }
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

  const collation = { locale: 'en' };

  let matchQuery = { enabled: true };
  matchQuery = searchQuery({ filter: matchQuery, fields: ['username'], q });

  let data = await User.lookup({
    filter: { username: req.user.username },
    project: { follows: 1 },
    options: { collation },
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
