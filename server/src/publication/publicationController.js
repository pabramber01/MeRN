import { Publication, publicationService } from './index.js';
import { StatusCodes } from 'http-status-codes';
import validator from 'validator';
import { User } from '../user/index.js';
import { Comment } from '../comment/index.js';
import { Types } from 'mongoose';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../error/error.js';
import {
  pageQuery,
  sortQuery,
  rangeDatesQuery,
  searchQuery,
} from '../utils/index.js';

const getAllPublications = async (req, res) => {
  const { after, before, sort, page, q } = req.query;
  const { username } = req.user;
  const pageSize = 9;

  const orderQuery = sortQuery({
    sort,
    fields: ['createdAt', 'updatedAt'],
    defaultSort: { updatedAt: -1, title: 1 },
  });

  const skipQuery = pageQuery({ page, pageSize });

  let filterQuery = searchQuery({
    filter: {},
    fields: ['title', 'description', 'user.username'],
    q,
  });

  filterQuery = rangeDatesQuery({
    filter: filterQuery,
    field: 'updatedAt',
    start: after,
    end: before,
  });

  const data = await Publication.lookup({
    filter: filterQuery,
    project: { title: 1, images: { $slice: ['$images', 1] }, user: 1 },
    options: { sort: orderQuery, limit: pageSize, skip: skipQuery },
    populate: {
      path: 'user',
      select: { username: 1, avatar: 1 },
      match: {
        $or: [{ enabled: true }, { username: username }],
      },
    },
  });

  res.status(StatusCodes.OK).json({ success: true, data });
};

const getPublication = async (req, res) => {
  const { id } = req.params;
  const { username, role, userId } = req.user;
  const isAdmin = role !== 'admin';

  if (!validator.isMongoId(id))
    throw new NotFoundError(`No publication found with id: '${id}'`);

  const data = await Publication.aggregate([
    { $match: { _id: Types.ObjectId(id) } },
    {
      $lookup: {
        from: 'users',
        as: 'user',
        let: { user: '$user' },
        pipeline: [
          {
            $match: {
              $or: [
                { enabled: true },
                { enabled: isAdmin },
                { username: username },
              ],
              $expr: { $eq: ['$_id', '$$user'] },
            },
          },
          {
            $project: { username: 1, avatar: 1 },
          },
        ],
      },
    },
    {
      $unwind: '$user',
    },
    {
      $lookup: {
        from: 'users',
        as: 'likedBy',
        let: { likedBy: '$likedBy' },
        pipeline: [
          {
            $match: {
              $or: [{ enabled: true }, { username: username }],
              $expr: { $in: ['$_id', '$$likedBy'] },
            },
          },
          { $project: { _id: 1 } },
        ],
      },
    },
    {
      $project: {
        title: 1,
        description: 1,
        images: 1,
        user: 1,
        createdAt: 1,
        updatedAt: 1,
        numLikes: { $size: '$likedBy' },
        isLiked: { $in: [{ _id: Types.ObjectId(userId) }, '$likedBy'] },
      },
    },
  ]);

  if (data.length === 0)
    throw new NotFoundError(`No publication found with id: '${id}'`);

  res.status(StatusCodes.OK).json({ success: true, data: data[0] });
};

const createPublication = async (req, res) => {
  const { title, description } = req.body;
  const { userId } = req.user;

  if (!req.files) throw new BadRequestError('No image uploaded');
  const files = req.files.images;
  const images = Array.isArray(files) ? files : [files];

  const areAllImages = images.every((img) => img.mimetype.startsWith('image'));
  if (!areAllImages) {
    throw new BadRequestError('You must only upload images');
  }

  const mb10 = 10 * 1024 * 1024;
  const areAllSmall = images.every((img) => img.size < mb10);
  if (!areAllSmall) {
    throw new BadRequestError('You must only upload images lower than 10MB');
  }

  const paths = images.map(
    (img, i) => `${i + 1}-image0${img.name.substr(img.name.lastIndexOf('.'))}`
  );

  const data = await Publication.create({
    title,
    description,
    images: paths,
    user: userId,
  });

  for (const [i, img] of images.entries())
    await publicationService.addPublication({ img, data, path: paths[i] });

  res
    .status(StatusCodes.CREATED)
    .json({ sucess: true, data: { _id: data._id } });
};

const updatePublication = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const { title, description } = req.body;
  const oldImg = !req.body.oldImg
    ? []
    : Array.isArray(req.body.oldImg)
    ? req.body.oldImg
    : [req.body.oldImg];

  const data = await Publication.findOne({ _id: id });

  if (!data) throw new NotFoundError(`No publication found with id: ${id}`);

  if (userId !== data.user.toString())
    throw new UnauthorizedError('Invalid credentials');

  if (!oldImg.every((img) => data.images.includes(img)))
    throw new BadRequestError('Images to preserve does not exists');

  if (oldImg.length === 0 && !req.files)
    throw new BadRequestError('No image uploaded');

  let paths = [];
  const images = [];
  if (req.files) {
    const files = req.files.newImg;
    Array.isArray(files) ? images.push(...files) : images.push(files);

    const areAllImages = images.every((i) => i.mimetype.startsWith('image'));
    if (!areAllImages) {
      throw new BadRequestError('You must only upload images');
    }

    const mb10 = 10 * 1024 * 1024;
    const areAllSmall = images.every((img) => img.size < mb10);
    if (!areAllSmall) {
      throw new BadRequestError('You must only upload images lower than 10MB');
    }

    images.forEach((img) => paths.push(img.name));
  }

  const v = Number(data.images[0].split('image').pop().split('.')[0]);
  const getBaseImg = (img) => img.split('/').splice(-1)[0].slice(2);
  const getExtension = (img) => img.substr(img.lastIndexOf('.'));
  oldImg.forEach((img) => paths.unshift(getBaseImg(img)));
  paths = paths.map((img, i) => `${i + 1}-image${v + 1}${getExtension(img)}`);

  const imagesToDelete = [];
  const imagesToRename = [];
  data.images.forEach((img, i) => {
    oldImg.includes(img)
      ? imagesToRename.push(`${i + 1}-image${v}${getExtension(img)}`)
      : imagesToDelete.push(`${i + 1}-image${v}${getExtension(img)}`);
  });

  data.set({ title, description, images: paths });
  await data.save();

  for (const img of imagesToDelete)
    await publicationService.deletePublication({ data, oldPh: img });

  for (const [i, img] of imagesToRename.entries())
    await publicationService.renamePublication({
      data,
      oldPh: img,
      newPh: paths[i],
    });

  if (images) {
    for (const [i, img] of images.entries())
      await publicationService.addPublication({
        img,
        data,
        path: paths[i + imagesToRename.length],
      });
  }

  res.status(StatusCodes.OK).json({ sucess: true, data: { _id: data._id } });
};

const deletePublication = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  const data = await Publication.findOne({ _id: id });

  if (!data) throw new NotFoundError(`No publication found with id: ${id}`);

  if (userId !== data.user.toString())
    throw new UnauthorizedError('Invalid credentials');

  await data.delete();

  await publicationService.deletePublication({ data });

  res.status(StatusCodes.OK).json({ success: true, data: { _id: data._id } });
};

const likePublication = async (req, res) => {
  const { id } = req.params;
  const { userId, username, role } = req.user;
  const isEnabled = { enabled: true };
  const isSelf = { username: username };
  const isAdmin = { enabled: role !== 'admin' };

  if (!validator.isMongoId(id))
    throw new NotFoundError(`No publication found with id: ${id}`);

  const data = (
    await Publication.lookup({
      filter: { _id: id },
      populate: { path: 'user', match: { $or: [isEnabled, isSelf, isAdmin] } },
    })
  )[0];

  if (!data) throw new NotFoundError(`No publication found with id: ${id}`);

  if (data.likedBy.includes(userId))
    throw new BadRequestError(`You already like this publication`);

  const user = await User.findOne({ _id: userId });

  user.likes.push(data._id);
  await user.save({ timestamps: false });

  data.likedBy.push(userId);
  await Publication.updateOne({ _id: id }, { ...data }, { timestamps: false });

  res.status(StatusCodes.OK).json({ sucess: true, data: { _id: data._id } });
};

const dislikePublication = async (req, res) => {
  const { id } = req.params;
  const { userId, username, role } = req.user;
  const isEnabled = { enabled: true };
  const isSelf = { username: username };
  const isAdmin = { enabled: role !== 'admin' };

  if (!validator.isMongoId(id))
    throw new NotFoundError(`No publication found with id: ${id}`);

  const user = await User.findOne({ _id: userId });
  const data = (
    await Publication.lookup({
      filter: { _id: id },
      populate: { path: 'user', match: { $or: [isEnabled, isSelf, isAdmin] } },
    })
  )[0];

  if (!data) throw new NotFoundError(`No publication found with id: ${id}`);

  const indexPub = data.likedBy.findIndex((u) => u._id.equals(user._id));
  if (indexPub === -1)
    throw new BadRequestError(`You did not like publication ${id}`);

  data.likedBy.splice(indexPub, 1);
  await Publication.updateOne({ _id: id }, { ...data }, { timestamps: false });

  const indexUser = user.likes.findIndex((p) => p._id.equals(data._id));

  user.likes.splice(indexUser, 1);
  await user.save({ timestamps: false });

  res.status(StatusCodes.OK).json({ sucess: true, data: { _id: data._id } });
};

const getAllCommentsByPublication = async (req, res) => {
  const { id } = req.params;
  const { after, before, sort, page } = req.query;
  const { username, role } = req.user;
  const isAdmin = role !== 'admin';
  const pageSize = 9;

  if (!validator.isMongoId(id))
    throw new NotFoundError(`No publication found with id: '${id}'`);

  const orderQuery = sortQuery({
    sort,
    fields: ['createdAt'],
    defaultSort: { createdAt: -1 },
  });

  const skipQuery = pageQuery({ page, pageSize });

  const filterQuery = rangeDatesQuery({
    filter: { publication: Types.ObjectId(id) },
    field: 'createdAt',
    start: after,
    end: before,
  });

  const pub = await Publication.lookup({
    filter: { _id: id },
    populate: {
      path: 'user',
      match: {
        $or: [{ enabled: true }, { enabled: isAdmin }, { username: username }],
      },
    },
  });

  if (pub.length === 0)
    throw new NotFoundError(`No publication found with id: '${id}'`);

  const data = await Comment.lookup({
    filter: filterQuery,
    project: { comment: 1, user: 1, updatedAt: 1, createdAt: 1 },
    options: { sort: orderQuery, limit: pageSize, skip: skipQuery },
    populate: {
      path: 'user',
      select: { username: 1, avatar: 1 },
      match: {
        $or: [{ enabled: true }, { username: username }],
      },
    },
  });

  res.status(StatusCodes.OK).json({ success: true, data });
};

export default {
  getAllPublications,
  getPublication,
  createPublication,
  updatePublication,
  deletePublication,
  likePublication,
  dislikePublication,
  getAllCommentsByPublication,
};
