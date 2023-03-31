import { Publication } from './index.js';
import { StatusCodes } from 'http-status-codes';
import { pageQuery, sortQuery } from '../utils/index.js';
import { BadRequestError, UnauthorizedError } from '../error/error.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs/promises';
import validator from 'validator';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFolder = '../../public/mern/publications';

const getAllPublications = async (req, res) => {
  const { sort, page } = req.query;
  const { username } = req.user;
  const pageSize = 9;

  const orderQuery = sortQuery({
    sort,
    fields: ['createdAt', 'updatedAt'],
    defaultSort: { updatedAt: -1 },
  });

  const skipQuery = pageQuery({ page, pageSize });

  const data = await Publication.lookup({
    filter: {},
    project: { title: 1, images: { $slice: ['$images', 1] }, user: 1 },
    options: { sort: orderQuery, limit: pageSize, skip: skipQuery },
    populate: {
      path: 'user',
      select: { username: 1, avatar: 1 },
      match: {
        $or: [{ enabled: true }, { enabled: false, username: username }],
      },
    },
  });

  res.status(StatusCodes.OK).json({ success: true, data });
};

const getPublication = async (req, res) => {
  const { id } = req.params;
  const { username, role } = req.user;
  const isAdmin = role === 'admin';

  if (!validator.isMongoId(id))
    throw new BadRequestError(`No publication found with id: '${id}'`);

  const data = await Publication.lookup({
    filter: { _id: id },
    project: { __v: 0 },
    populate: {
      path: 'user',
      select: { username: 1, avatar: 1 },
      match: {
        $or: [
          { enabled: true },
          { enabled: isAdmin && false },
          { enabled: false, username: username },
        ],
      },
    },
  });

  if (data.length === 0)
    throw new BadRequestError(`No publication found with id: '${id}'`);

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
    await img.mv(
      path.join(__dirname, `${staticFolder}/${data._id}/${paths[i]}`)
    );

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

  if (!data || userId !== data.user.toString())
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

    const areAllImages = images.every((img) =>
      img.mimetype.startsWith('image')
    );

    if (!areAllImages) {
      throw new BadRequestError('You must only upload images');
    }

    images.forEach((img) => paths.push(img.name));
  }

  const v = data.__v;
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
    await fs.rm(path.join(__dirname, `${staticFolder}/${data._id}/${img}`));

  for (const [i, img] of imagesToRename.entries())
    await fs.rename(
      path.join(__dirname, `${staticFolder}/${data._id}/${img}`),
      path.join(__dirname, `${staticFolder}/${data._id}/${paths[i]}`)
    );

  if (images) {
    for (const [i, img] of images.entries())
      await img.mv(
        path.join(
          __dirname,
          `${staticFolder}/${data._id}/${paths[i + imagesToRename.length]}`
        )
      );
  }

  res.status(StatusCodes.OK).json({ sucess: true, data: { _id: data._id } });
};

const deletePublication = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  const data = await Publication.findOne({ _id: id });

  if (!data || userId !== data.user.toString())
    throw new UnauthorizedError('Invalid credentials');

  await data.delete();

  await fs.rm(path.join(__dirname, `${staticFolder}/${data._id}`), {
    recursive: true,
  });

  res.status(StatusCodes.OK).json({ success: true, data: { _id: data._id } });
};

export default {
  getAllPublications,
  getPublication,
  createPublication,
  updatePublication,
  deletePublication,
};
