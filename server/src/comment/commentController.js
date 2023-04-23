import { NotFoundError, UnauthorizedError } from '../error/error.js';
import { Comment } from './index.js';
import { Publication } from '../publication/index.js';
import { StatusCodes } from 'http-status-codes';
import validator from 'validator';

const createComment = async (req, res) => {
  const { comment, publication } = req.body;
  const { userId, username, role } = req.user;
  const isAdmin = role !== 'admin';

  if (!validator.isMongoId(publication))
    throw new NotFoundError(`No publication found with id: ${publication}`);

  const pub = await Publication.lookup({
    filter: { _id: publication },
    populate: {
      path: 'user',
      match: {
        $or: [{ enabled: true }, { enabled: isAdmin }, { username: username }],
      },
    },
  });

  if (pub.length === 0)
    throw new NotFoundError(`No publication found with id: ${publication}`);

  const data = await Comment.create({
    comment,
    publication,
    user: userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, data: { _id: data._id } });
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const { userId, role, username } = req.user;
  const isAdmin = role !== 'admin';

  const data = await Comment.findOne({ _id: id });

  if (!data) throw new NotFoundError(`No comment found with id: ${id}`);

  const pub = await Publication.lookup({
    filter: { _id: data.publication },
    populate: {
      path: 'user',
      match: {
        $or: [{ enabled: true }, { enabled: isAdmin }, { username: username }],
      },
    },
  });

  if (pub.length === 0)
    throw new NotFoundError(`No post found with id: ${data.publication}`);

  if (data.user.toString() !== userId)
    throw new UnauthorizedError('Invalid credentials');

  data.set({ comment });
  await data.save();

  res.status(StatusCodes.OK).json({ success: true, data: { _id: data._id } });
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  const { userId, role, username } = req.user;
  const isAdmin = role !== 'admin';

  const data = await Comment.findOne({ _id: id });

  if (!data) throw new NotFoundError(`No comment found with id: ${id}`);

  const pub = await Publication.lookup({
    filter: { _id: data.publication },
    populate: {
      path: 'user',
      match: {
        $or: [{ enabled: true }, { enabled: isAdmin }, { username: username }],
      },
    },
  });

  if (pub.length === 0)
    throw new NotFoundError(`No post found with id: ${data.publication}`);

  if (data.user.toString() !== userId)
    throw new UnauthorizedError('Invalid credentials');

  await data.delete();

  res.status(StatusCodes.OK).json({ success: true, data: { _id: data._id } });
};

export default { createComment, updateComment, deleteComment };
