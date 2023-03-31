import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const connectDB = (url) => {
  return mongoose.connect(url);
};

const concatPubImg = (img, id) =>
  `${process.env.BASE_URL}/mern/static/publications/${id}/${img}`;

const concatUserAvat = (img, id) => {
  const route = img.includes('default')
    ? 'common/static/avatars'
    : `mern/static/users/${id}`;
  return `${process.env.BASE_URL}/${route}/${img}`;
};

const lookupPipeline = (modelName, { filter, project, options, populate }) => {
  const isEmpty = (obj) => typeof obj !== 'object' || obj.length === 0;

  if (isEmpty(filter)) filter = {};
  if (isEmpty(project)) project = null;
  if (isEmpty(options)) options = { sort: null, limit: null, skip: null };

  const { sort, limit, skip } = options;
  const { path, match } = populate;
  const select = isEmpty(populate.select) ? null : populate.select;

  const pipeline = [];

  const populatePipeline = [
    {
      $match: {
        ...match,
        $expr: { $eq: ['$_id', `$$${path}`] },
      },
    },
  ];
  if (select) populatePipeline.push({ $project: select });

  if (filter._id) filter._id = mongoose.Types.ObjectId(filter._id);

  pipeline.push({ $match: filter });
  pipeline.push(
    {
      $lookup: {
        from: modelName,
        as: path,
        let: { [path]: `$${path}` },
        pipeline: populatePipeline,
      },
    },
    {
      $unwind: `$${path}`,
    }
  );
  if (sort) pipeline.push({ $sort: sort });
  if (skip) pipeline.push({ $skip: skip });
  if (limit) pipeline.push({ $limit: limit });
  if (project) pipeline.push({ $project: project });

  return pipeline;
};

export default connectDB;
export { concatPubImg, concatUserAvat, lookupPipeline };
