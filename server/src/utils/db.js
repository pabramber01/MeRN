import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

mongoose.set('strictQuery', false);

const connectDB = (url) => {
  return mongoose.connect(url);
};

const connectTestDB = async (mongod) => {
  const url = await mongod.getUri();
  await mongoose.connect(url);
};

const closeTestDB = async (mongod) => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

const clearTestDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
};

const updateArray = (obj, field) => [
  { [field]: obj._id },
  { $pull: { [field]: obj._id } },
  { timestamps: false },
];

const concatPubImg = (img, id) => {
  let url;

  if (process.env.NODE_ENV !== 'production') {
    url = `${process.env.BASE_URL}/mern/static/publications/${id}/${img}`;
  } else {
    const publicId = `mern/publications/${id}/${img}`;
    url = cloudinary.url(publicId, {
      secure: true,
      type: 'authenticated',
      sign_url: true,
    });
  }

  return url;
};

const concatUserAvat = (img, id) => {
  let url;

  if (img.includes('default')) {
    url = `${process.env.BASE_URL}/common/static/avatars/${img}`;
  } else if (process.env.NODE_ENV !== 'production') {
    url = `${process.env.BASE_URL}/mern/static/users/${id}/${img}`;
  } else {
    const publicId = `mern/users/${id}/${img}`;
    url = cloudinary.url(publicId, {
      secure: true,
      type: 'authenticated',
      sign_url: true,
    });
  }

  return url;
};

const lookupPipeline = (schema, { filter, project, options, populate }) => {
  const isEmpty = (obj) => typeof obj !== 'object' || obj.length === 0;
  const nullOpt = { sort: null, limit: null, skip: null };

  if (isEmpty(filter)) filter = {};
  if (isEmpty(project)) project = null;
  if (isEmpty(options)) options = nullOpt;

  const { sort, limit, skip } = options;
  const { path, match } = populate;
  const select = isEmpty(populate.select) ? null : populate.select;
  const optionsPop = isEmpty(populate.options) ? nullOpt : populate.options;
  const { sort: sortPop, limit: limitPop, skip: skipPop } = optionsPop;

  const pathIsArray = schema.path(path).instance === 'Array';
  const modelName = mongoose.model(schema.path(path).options.ref).collection
    .name;

  if (filter._id) filter._id = mongoose.Types.ObjectId(filter._id);

  const populatePipeline = [
    {
      $match: {
        ...match,
        $expr: { $in: ['$_id', pathIsArray ? `$$${path}` : [`$$${path}`]] },
      },
    },
  ];
  if (sortPop) populatePipeline.push({ $sort: sortPop });
  if (skipPop) populatePipeline.push({ $skip: skipPop });
  if (limitPop) populatePipeline.push({ $limit: limitPop });
  if (select) populatePipeline.push({ $project: select });

  const pipeline = [
    {
      $lookup: {
        from: modelName,
        as: path,
        let: { [path]: `$${path}` },
        pipeline: populatePipeline,
      },
    },
    { $match: filter },
  ];
  if (!pathIsArray) pipeline.push({ $unwind: `$${path}` });
  if (sort) pipeline.push({ $sort: sort });
  if (skip) pipeline.push({ $skip: skip });
  if (limit) pipeline.push({ $limit: limit });
  if (project) pipeline.push({ $project: project });

  return pipeline;
};

export default connectDB;
export {
  connectTestDB,
  closeTestDB,
  clearTestDB,
  updateArray,
  concatPubImg,
  concatUserAvat,
  lookupPipeline,
};
