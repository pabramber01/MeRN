import { Publication } from './index.js';
import { StatusCodes } from 'http-status-codes';
import { pageQuery, sortQuery } from '../utils/index.js';

const getAllPublications = async (req, res) => {
  const { sort, page } = req.query;
  const pageSize = 9;

  const orderQuery = sortQuery({
    sort,
    fields: ['createdAt', 'updatedAt'],
    defaultSort: { updatedAt: -1 },
  });

  const skipQuery = pageQuery({ page, pageSize });

  const data = await Publication.find(
    {},
    { title: 1, images: { $slice: 1 }, user: 1 },
    { sort: orderQuery, limit: pageSize, skip: skipQuery }
  ).populate('user', 'username avatar');

  res.status(StatusCodes.OK).json({ success: true, data });
};

export default { getAllPublications };
