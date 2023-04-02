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
    { $match: filter },
    {
      $lookup: {
        from: modelName,
        as: path,
        let: { [path]: `$${path}` },
        pipeline: populatePipeline,
      },
    },
  ];
  if (!pathIsArray) pipeline.push({ $unwind: `$${path}` });
  if (sort) pipeline.push({ $sort: sort });
  if (skip) pipeline.push({ $skip: skip });
  if (limit) pipeline.push({ $limit: limit });
  if (project) pipeline.push({ $project: project });

  return pipeline;
};

export default connectDB;
export { concatPubImg, concatUserAvat, lookupPipeline };
